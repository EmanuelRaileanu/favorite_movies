import express from 'express';
import { knex } from '../utilities/knexconfig';
import fs from 'fs';
import util from 'util';
import { Actor } from '../entities/actors';
import { File } from '../entities/files';
import { Award } from '../entities/awards';
import { Studies } from '../entities/studies';
import { Nationality } from '../entities/nationalities';
import * as type from '../utilities/customTypes';
import { Institution } from '../entities/institutions';
import { Degree } from '../entities/degrees';
import { AwardName } from '../entities/award_list';
import { Movie } from '../entities/movies';

const deleteFile = util.promisify(fs.unlink);

async function getPagination(req: express.Request){
    const reg = /^[0-9]+/;
    const length = parseInt(String(await new Actor().length));
    const page = parseInt(reg.test(String(req.query.page))? String(req.query.page) : '1') || 1;
    const pageSize = parseInt(reg.test(String(req.query.pageSize))? String(req.query.pageSize) : '10') || 10;
    const pageCount = Math.ceil(length / pageSize);
    return{
        page,
        pageSize,
        pageCount
    };
};

export const getActors = async (req: express.Request, res: express.Response) => {
    const pagination = await getPagination(req);
    const actors = await new Actor().fetchPage({
        require: false,
        page: pagination.page,
        pageSize: pagination.pageSize,
        withRelated: ['nationality', 'awards', 'awards.award', 'studies', 'studies.institution', 'studies.degree', 'movies', 'movies.productionCompany','movies.categories', 'movies.poster', 'actorPhoto']
    });

    if(!actors.length){
        res.status(404).json('Page not found');
        return;
    }

    res.json({
        actors,
        pagination
    });
};

export const getActorById = async (req: express.Request, res: express.Response) => {
    const actor = await new Actor({id: req.params.id}).fetch({
        require: false,
        withRelated: ['nationality', 'awards', 'awards.award', 'studies', 'studies.institution', 'studies.degree', 'movies', 'movies.productionCompany','movies.categories', 'movies.poster', 'actorPhoto']
    });

    if(!actor){
        res.status(404).json('Actor not found');
        return;
    }

    res.json(actor);
};

export const postActor = async (req: express.Request, res: express.Response) => {
    let id: number | undefined;
    await knex.transaction(async trx => {
        let imageId: number | undefined;
        if(req.file){
            const image = {
                originalFileName: req.file.originalname,
                mimeType: req.file.mimetype,
                relativePath: req.file.path,
                size: req.file.size,
                fileName: req.file.filename
            };
            imageId = (await new File().save(image, {
                transacting: trx,
                method: 'insert'
            })).get('id');
        }

        const movies = req.body.movies;
        delete req.body.movies;

        const actor = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            fbProfileLink: req.body.fbProfileLink,
            shortDescription: req.body.shortDescription,
            recentPhotoId: imageId,
            nationalityId: await new Nationality({nationality: String(req.body.nationality)}).fetch({require: false, transacting: trx}).get('nationality') || await new Nationality({nationality: 'Other'}).getId(trx)
        };

        id = (await new Actor().save(actor, {
            transacting: trx,
            method: 'insert'
        })).get('id');

        if(req.body.studies !== undefined){
            for(const elem of req.body.studies){
                if(await new Institution({id: elem.institutionId}).checkIfExists(trx) && await new Degree({id: elem.degreeId}).checkIfExists(trx)){
                    elem.actorId = id;
                    await new Studies().save(elem, {
                        transacting: trx,
                        method: 'insert'
                    });
                }
            }
        }
        if(req.body.awards !== undefined){
            for(const award of req.body.awards){
                if(await new AwardName({id: award.awardId}).checkIfExists(trx)){
                    award.actorId = id;
                    await new Award().save(award, {
                        transacting: trx,
                        method: 'insert'
                    });
                }
            }
        }

        if(movies !== undefined){
            let movieIds;
            movieIds = movies.map((movie: any) => movie.id);
            for(let i = 0; i < movieIds.length; i++){
                if(!await new Movie({id: movieIds[i]}).checkIfExists(trx)){
                    movieIds.splice(i, 1);
                }
            }
            await new Actor({id}).movies().attach(movieIds, {transacting: trx});
        }
    });

    const entry = await new Actor({id}).fetch({
        require: false,
        withRelated: ['nationality', 'awards', 'awards.award', 'studies', 'studies.institution', 'studies.degree', 'movies', 'movies.productionCompany','movies.categories', 'movies.poster', 'actorPhoto']
    });
    res.json(entry);
};

export const updateActor = async (req: express.Request, res: express.Response) => {
    if(!await new Actor({id: parseInt(req.params.id, 10)}).fetch({require: false})){
        res.json(`Canot update actor with id ${req.params.id} because it does not exist in the database`);
        return;
    }

    let recentPhotoId: number;
    const finalMovieIds: number[] = [];
    await knex.transaction(async trx => {
        const actor = await new Actor({id: req.params.id}).fetch({
            require: false,
            withRelated: ['nationality', 'awards', 'awards.award', 'studies', 'studies.institution', 'studies.degree', 'movies', 'movies.productionCompany','movies.categories', 'movies.poster', 'actorPhoto']
        });
        if(req.body.movies !== undefined){
            const updatedMovieIds = req.body.movies.map((movie: any) => movie.id);
            const oldMovieIds = await Promise.all(actor.related('movies').toJSON().map((movie: type.Movie) => movie.id));
            await actor.movies().detach(oldMovieIds, {transacting: trx});
            for(const updatedMovieId of updatedMovieIds){
                if(await new Movie({id: updatedMovieId}).checkIfExists(trx)){
                    finalMovieIds.push(updatedMovieId);
                }
            }
            await actor.movies().attach(finalMovieIds, {transacting: trx});
            delete req.body.movies;
        }

        if(req.body.nationality !== undefined){
            if(await new Nationality({nationality: req.body.nationality}).checkIfExists(trx)){
                req.body.nationalityId = await new Nationality({nationality: req.body.nationality}).getId(trx);
            }
            delete req.body.nationality;
        }


        if(req.body.studies !== undefined){
            const oldStudiesIds: number[] = await Promise.all(actor.related('studies').toJSON().map(async (s: type.Studies) => s.id, 10));
            for(const elem of oldStudiesIds){
                await new Studies().where({id: elem}).destroy({transacting: trx});
            }
            for(const s of req.body.studies){
                s.actorId = req.params.id;
                await new Studies().save(s, {transacting: trx, method: 'insert'});
            }
            delete req.body.studies;
        }

        if(req.body.awards !== undefined){
            const oldAwardsIds: number[] = await Promise.all(actor.related('awards').toJSON().map(async (award: type.Award) => award.id));
            for(const oldAwardId of oldAwardsIds){
                await new Award().where({id: oldAwardId}).destroy({transacting: trx});
            }
            for(const award of req.body.awards){
                award.actorId = req.params.id;
                await new Award().save(award, {transacting: trx, method: 'insert'});
            }
            delete req.body.awards;
        }

        req.body.recentPhotoId = null;
        await actor.save(req.body, {transacting: trx, method: 'update'});

        let oldPhotoPath: string | undefined;
        if(req.file){

            oldPhotoPath = actor.related('actorPhoto').get('relativePath');

            if(oldPhotoPath){
                await actor.actorPhoto().where({id: actor.related('actorPhoto').get('id')}).destroy({transacting: trx});
            }

            const photo = {
                originalFileName: req.file.originalname,
                mimeType: req.file.mimetype,
                relativePath: req.file.path,
                size: req.file.size,
                fileName: req.file.filename
            };

            recentPhotoId = (await new File().save(photo, {
                transacting: trx,
                method: 'insert'
            })).get('id');
        }

        await actor.save({recentPhotoId}, {transacting: trx, method: 'update'});

        if(oldPhotoPath && oldPhotoPath !== req.file.path){
            await deleteFile(oldPhotoPath);
        }
    });

    const updatedActor = await new Actor({id: req.params.id}).fetch({
        require: false,
        withRelated: ['nationality', 'awards', 'awards.award', 'studies', 'studies.institution', 'studies.degree', 'movies', 'movies.productionCompany','movies.categories', 'movies.poster', 'actorPhoto']
    });

    res.json(updatedActor);
};

export const deleteActor = async (req: express.Request, res: express.Response) => {
    if(!await new Actor({id: parseInt(req.params.id, 10)}).fetch({require: false})){
        res.status(404).json('Actor not found');
        return;
    }

    await knex.transaction(async trx => {
        const actor = await new Actor({id: req.params.id}).fetch({
            require: false,
            withRelated: ['nationality', 'awards', 'awards.award', 'studies', 'studies.institution', 'studies.degree', 'movies', 'movies.productionCompany','movies.categories', 'movies.poster', 'actorPhoto']
        });
        const oldMovieIds = await Promise.all(actor.related('movies').toJSON().map((movie: type.Movie) => movie.id));
        await actor.movies().detach(oldMovieIds, {transacting: trx});

        await Promise.all(actor.related('studies').toJSON().map(async (s: type.Studies) => {
            await new Studies().where({id: s.id}).destroy({transacting: trx});
        }));

        await Promise.all(await actor.related('awards').toJSON().map(async (award: type.Award) => {
            await new Award().where({id: award.id}).destroy({transacting: trx});
        }));

        await actor.where({id:req.params.id}).destroy({transacting: trx});

        if((await new Actor({id: req.params.id}).fetch()).get('recentPhotoId')){
            await actor.actorPhoto().where({id: actor.related('actorPhoto').get('id')}).destroy({transacting: trx});
            await deleteFile(await actor.related('actorPhoto').get('relativePath'));
        }
    });
    res.status(204).send();
};




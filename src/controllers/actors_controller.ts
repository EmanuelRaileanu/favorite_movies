import express from 'express';
import { knex } from '../utilities/knexconfig';
import fs from 'fs';
import util from 'util';
import { Actor } from '../entities/actors';
import { File } from '../entities/files';
import { Movie } from '../entities/movies';

const deleteFile = util.promisify(fs.unlink);

export const getActors = async (req: express.Request, res: express.Response) => {
    const actors = await new Actor().fetchAll({
        require: false,
        withRelated: ['movies', 'actorPhoto']
    });

    if(!actors){
        res.status(404).json('Page not found');
        return;
    }

    res.json(actors);
};

export const getActorById = async (req: express.Request, res: express.Response) => {
    const actor = await new Actor({id: req.params.id}).fetch({
        require: false,
        withRelated: ['movies', 'actorPhoto']
    });

    if(!actor){
        res.status(404).json('Actor not found');
        return;
    }

    res.json(actor);
};

export const postActor = async (req: express.Request, res: express.Response) => {
    if(!req.body.firstName || !req.body.lastName){
        res.status(400).json('Bad request');
        return;
    }

    let id;
    await knex.transaction(async trx => {
        let imageId;
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

        req.body.recentPhotoId = imageId;
        id = (await new Actor().save(req.body, {
            transacting: trx,
            method: 'insert'
        })).get('id');

        if(movies !== undefined){
            let movieIds;
            movieIds = movies.map((movie: any) => movie.id);
            for(let i = 0; i < movieIds.length; i++){
                if(!await checkIfMovieExists(movieIds[i])){
                    movieIds.splice(i, 1);
                }
            }
            await new Actor({id}).movies().attach(movieIds, {transacting: trx});
        }
    });

    const entry = await new Actor({id}).fetch({
        require: false,
        withRelated: ['movies', 'actorPhoto']
    });
    res.json(entry);
};

async function checkIfMovieExists(id: number){
    const find = await new Movie({id}).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export const updateActor = async (req: express.Request, res: express.Response) => {
    if(!await checkIfActorExists(parseInt(req.params.id, 10))){
        res.json(`Canot update actor with id ${req.params.id} because it does not exist in the database`);
        return;
    }

    let recentPhotoId: number;
    const finalMovieIds: any[] = [];
    await knex.transaction(async trx => {
        const actor = await new Actor({id: req.params.id}).fetch({
            require: false,
            withRelated: ['movies', 'actorPhoto']
        });
        if(req.body.movies !== undefined){
            const updatedMovieIds = req.body.movies.map((m: any) => m.id);
            const oldMovieIds = await Promise.all(actor.related('movies').toJSON().map((mov: any) => mov.id));
            await actor.movies().detach(oldMovieIds, {transacting: trx});
            for(const updatedMovieId of updatedMovieIds){
                if(await checkIfMovieExists(updatedMovieId)){
                    finalMovieIds.push(updatedMovieId);
                }
            }
            await actor.movies().attach(finalMovieIds, {transacting: trx});
            delete req.body.categories;
        }

        let oldPhotoPath;

        if(req.file){

            oldPhotoPath = actor.related('actorPhoto').get('relativePath');

            req.body.recentPhotoId = null;
            await actor.save(req.body, {transacting: trx, method: 'update'});

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
        withRelated: ['movies', 'actorPhoto']
    });

    res.json(updatedActor);
};

async function checkIfActorExists(id: number){
    const find = await new Actor({id}).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export const deleteActor = async (req: express.Request, res: express.Response) => {
    if(!checkIfActorExists(parseInt(req.params.id, 10))){
        res.status(404).json('Actor not found');
        return;
    }

    await knex.transaction(async trx => {
        const actor = await new Actor({id: req.params.id}).fetch({
            require: false,
            withRelated: ['movies', 'actorPhoto']
        });
        const oldMovieIds = await Promise.all(actor.related('movies').toJSON().map((movie: any) => movie.id));
        await actor.movies().detach(oldMovieIds, {transacting: trx});

        await actor.where({id:req.params.id}).destroy({transacting: trx});
        if((await new Actor({id: req.params.id}).fetch()).get('recentPhotoId')){
            await actor.actorPhoto().where({id: actor.related('actorPhoto').get('id')}).destroy({transacting: trx});
            await deleteFile(await actor.related('actorPhoto').get('relativePath'));
        }
    });
    res.status(204).send();
};




import { knex } from '../utilities/knexconfig';
import express from 'express';
import { paginate, getLength } from '../utilities/paginate';
import { Movie } from '../entities/movies';
import { MovieCategory } from '../entities/movie_categories';
import { File } from '../entities/files';
import fs from 'fs';
import util from 'util';
import * as functions from '../utilities/functions';
import * as type from '../utilities/customTypes';
import { searchMovieByTitle } from '../utilities/omdbAPIFunctions';

const deleteFile = util.promisify(fs.unlink);

export const getMovies = async (req: express.Request, res: express.Response) => {
    const reg = new RegExp('^[0-9]+');
    const length = await getLength('movies');
    const page = parseInt(reg.test(String(req.query.page))? String(req.query.page) : '1', 10) || 1;
    const pageSize = parseInt(reg.test(String(req.query.pageSize))? String(req.query.pageSize) : '10', 10) || 10;

    const result = await paginate(page, pageSize, length);

    if(result && !result.results.length){
        res.status(404).json('Page not found');
        return;
    }

    res.json(result);
};

export const getMovieCategories = async (req: express.Request, res: express.Response) => {
    const rows = (await new MovieCategory().fetchAll()).toJSON();
    res.json(rows);
};

export const getMovieById = async (req: express.Request, res: express.Response) => {
    const movie = await new Movie({id:req.params.id}).fetch({
        require:false,
        withRelated: ['productionCompany', 'categories', 'poster', 'languages', 'movieScenes', 'movieScenes.movieSet', 'movieScenes.movieSet.address', 
        'movieScenes.movieSet.address.street', 'actors', 'actors.nationality', 'actors.actorPhoto','actors.awards', 'actors.awards.award', 'actors.studies', 
        'actors.studies.institution', 'actors.studies.degree', 'productionCrew', 'productionCrew.address',
        'productionCrew.address.street', 'productionCrew.address.street.location', 'productionCrew.address.street.location.country', 
        'productionCrew.productionCrewType']
    });

    if(!movie){
        res.status(404).json('Movie not found');
        return;
    }

    res.json(movie);
};

export const postMovie = async (req: express.Request, res: express.Response) => {
    let id: number | undefined;

    await knex.transaction(async trx => {
        if(!req.body.title){
            res.status(400).json('Bad request');
            return;
        }

        let posterId;
        if(req.file){
            const poster = {
                originalFileName: req.file.originalname,
                mimeType: req.file.mimetype,
                relativePath: req.file.path,
                size: req.file.size,
                fileName: req.file.filename
            };

            posterId = (await new File().save(poster, {
                transacting: trx, method: 'insert'
            })).get('id');
        }

        const movie = {
            title: req.body.title,
            description: req.body.description,
            runtime: req.body.runtime,
            releaseDate: req.body.releaseDate,
            budget: req.body.budget,
            gross: req.body.gross,
            overallRating: req.body.overallRating,
            ProductionCompanyId: req.body.ProductionCompanyId,
            posterId
        };

        id = (await new Movie().save(movie, {transacting: trx, method: 'insert'})).get('id');
        if(req.body.categories !== undefined){
            let categoryIds;
            categoryIds = (req.body.categories.map((category: any) => category.id));
            for(let i = 0; i < categoryIds.length; i++){
                if(!await functions.checkIfCategoryExists(categoryIds[i])){
                    categoryIds.splice(i, 1);
                }
            }
            await new Movie({id}).categories().attach(categoryIds, {transacting:trx});
        }
    });

    const newEntry = await (await new Movie({id}).fetch({
        require: false,
        withRelated: ['productionCompany', 'categories', 'poster', 'languages', 'movieScenes', 'movieScenes.movieSet', 'movieScenes.movieSet.address', 
        'movieScenes.movieSet.address.street', 'actors', 'actors.nationality', 'actors.actorPhoto','actors.awards', 'actors.awards.award', 'actors.studies', 
        'actors.studies.institution', 'actors.studies.degree', 'productionCrew', 'productionCrew.address',
        'productionCrew.address.street', 'productionCrew.address.street.location', 'productionCrew.address.street.location.country', 
        'productionCrew.productionCrewType']
    })).toJSON();

    res.json(newEntry);
};

export const updateMovie = async (req: express.Request, res: express.Response) => {
    if(!await functions.checkIfMovieExists(parseInt(req.params.id, 10))){
        res.json(`Canot update movie with id ${req.params.id} because it does not exist in the database`);
        return;
    }

    let posterId: number;
    const finalCategoryIds: number[] = [];
    await knex.transaction(async trx => {
        const movie = await new Movie({id: req.params.id}).fetch({
            require: false,
            withRelated: ['productionCompany', 'categories', 'poster', 'languages', 'movieScenes', 'movieScenes.movieSet', 'movieScenes.movieSet.address', 
            'movieScenes.movieSet.address.street', 'actors', 'actors.nationality', 'actors.actorPhoto','actors.awards', 'actors.awards.award', 'actors.studies', 
            'actors.studies.institution', 'actors.studies.degree', 'productionCrew', 'productionCrew.address',
            'productionCrew.address.street', 'productionCrew.address.street.location', 'productionCrew.address.street.location.country', 
            'productionCrew.productionCrewType']
        });
        if(req.body.categories !== undefined){
            const updatedCategoryIds = req.body.categories.map((category: type.Category) => category.id);
            const oldCategoryIds = await Promise.all(movie.related('categories').toJSON().map((category: type.Category) => category.id));
            await movie.categories().detach(oldCategoryIds, {transacting: trx});
            for(const updatedCategoryId of updatedCategoryIds){
                if(await functions.checkIfCategoryExists(updatedCategoryId)){
                    finalCategoryIds.push(updatedCategoryId);
                }
            }
            await movie.categories().attach(finalCategoryIds, {transacting: trx});
            delete req.body.categories;
        }

        let oldPosterPath;
        if(req.file){

            oldPosterPath = movie.related('poster').get('relativePath');

            req.body.posterId = null;
            await movie.save(req.body, {transacting: trx, method: 'update'});

            if(oldPosterPath){
                await movie.poster().where({id: movie.related('poster').get('id')}).destroy({transacting: trx});
                // await movie.related('poster').destroy(); // Property 'destroy' does not exist on type 'Model<any> | Collection<Model<any>>'
            }

            const poster = {
                originalFileName: req.file.originalname,
                mimeType: req.file.mimetype,
                relativePath: req.file.path,
                size: req.file.size,
                fileName: req.file.filename
            };

            posterId = (await new File().save(poster, {
                transacting: trx,
                method: 'insert'
            })).get('id');
        }

        await movie.save({posterId}, {transacting: trx, method: 'update'});

        if(oldPosterPath && oldPosterPath !== req.file.path){
            await deleteFile(oldPosterPath);
        }
    });

    const updatedMovie = (await new Movie({id: req.params.id}).fetch({
        require: false,
        withRelated: ['productionCompany', 'categories', 'poster', 'languages', 'movieScenes', 'movieScenes.movieSet', 'movieScenes.movieSet.address', 
        'movieScenes.movieSet.address.street', 'actors', 'actors.nationality', 'actors.actorPhoto','actors.awards', 'actors.awards.award', 'actors.studies', 
        'actors.studies.institution', 'actors.studies.degree', 'productionCrew', 'productionCrew.address',
        'productionCrew.address.street', 'productionCrew.address.street.location', 'productionCrew.address.street.location.country', 
        'productionCrew.productionCrewType']
    })).toJSON();

    res.json(updatedMovie);
};

export const deleteMovie = async (req: express.Request, res: express.Response) => {
    if(!functions.checkIfMovieExists(parseInt(req.params.id, 10))){
        res.status(404).json('Movie not found');
        return;
    }
    await knex.transaction(async trx => {
        const movie = await new Movie({id: req.params.id}).fetch({
            require: false,
            withRelated: ['productionCompany', 'categories', 'poster', 'languages', 'movieScenes', 'movieScenes.movieSet', 'movieScenes.movieSet.address', 
            'movieScenes.movieSet.address.street', 'actors', 'actors.nationality', 'actors.actorPhoto','actors.awards', 'actors.awards.award', 'actors.studies', 
            'actors.studies.institution', 'actors.studies.degree', 'productionCrew', 'productionCrew.address',
            'productionCrew.address.street', 'productionCrew.address.street.location', 'productionCrew.address.street.location.country', 
            'productionCrew.productionCrewType']
        });
        const oldCategoryIds = await Promise.all(movie.related('categories').toJSON().map((category: type.Category) => category.id));
        await movie.categories().detach(oldCategoryIds, {transacting: trx});

        const oldLanguagesIds = await Promise.all(movie.related('languages').toJSON().map((language: type.Language) => language.id));
        await movie.languages().detach(oldLanguagesIds, {transacting: trx});

        const oldActorsIds = await Promise.all(movie.related('actors').toJSON().map((actor: type.Actor) => actor.id));
        await movie.actors().detach(oldActorsIds, {transacting: trx});

        const oldProductionCrewIds = await Promise.all(movie.related('productionCrew').toJSON().map((member: type.ProductionCrewMember) => member.id));
        await movie.productionCrew().detach(oldProductionCrewIds, {transacting: trx})

        await movie.where({id:req.params.id}).destroy({transacting: trx});

        if((await new Movie({id:req.params.id}).fetch()).get('posterId') !== null){
            await movie.poster().where({id: movie.related('poster').get('id')}).destroy({transacting: trx});
            await deleteFile(await movie.related('poster').get('relativePath'));
        }
    });
    res.status(204).send();
};


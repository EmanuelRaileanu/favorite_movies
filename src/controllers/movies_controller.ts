import express from 'express';
import { Movie } from '../entities/movies';
import { knex } from '../utilities/knexconfig';
import { MovieCategory } from '../entities/movie_categories';
import { File } from '../entities/files';
import fs from 'fs';
import util from 'util';
import * as type from '../utilities/customTypes';
import * as handler from '../utilities/exceptionHandlers';

const deleteFile = util.promisify(fs.unlink);

async function getPagination(req: express.Request){
    const reg = /^[0-9]+/;
    const length = parseInt(String(await new Movie().length));
    const page = parseInt(reg.test(String(req.query.page))? String(req.query.page) : '1') || 1;
    const pageSize = parseInt(reg.test(String(req.query.pageSize))? String(req.query.pageSize) : '10') || 10;
    const pageCount = Math.ceil(length / pageSize);
    return{
        page,
        pageSize,
        pageCount
    };
};

const withRelated = ['productionCompany', 'categories', 'poster', 'languages', 'movieScenes', 'movieScenes.movieSet', 'movieScenes.movieSet.address', 
                'movieScenes.movieSet.address.street', 'actors', 'actors.nationality', 'actors.actorPhoto','actors.awards', 'actors.awards.award', 'actors.studies', 
                'actors.studies.institution', 'actors.studies.degree', 'productionCrew', 'productionCrew.address',
                'productionCrew.address.street', 'productionCrew.address.street.location', 'productionCrew.address.street.location.country', 
                'productionCrew.productionCrewType'];

async function fetchMovies(req: express.Request){
    const pagination = await getPagination(req);
    const movies = await new Movie().fetchPage({
        require:false,
        page: pagination.page,
        pageSize: pagination.pageSize,
        withRelated
    });
    return{
        movies,
        pagination
    };
};

async function fetchMovieById(id: number){
    return await new Movie({id}).fetch({require: false, withRelated});
};

async function saveMovie(req: express.Request){
    return await knex.transaction(async trx => {
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

        const id = (await new Movie().save(movie, {transacting: trx, method: 'insert'})).get('id');
        if(req.body.categories !== undefined){
            let categoryIds;
            categoryIds = (req.body.categories.map((category: any) => category.id));
            for(let i = 0; i < categoryIds.length; i++){
                if(!await new MovieCategory({id: categoryIds[i]}).checkIfExists(trx)){
                    categoryIds.splice(i, 1);
                }
            }
            await new Movie({id}).categories().attach(categoryIds, {transacting:trx});
        }
        return id;
    });
};

async function UpdateMovie(req: express.Request){
    await knex.transaction(async trx => {
        let posterId;
        const finalCategoryIds: number[] = [];
        const movie = await fetchMovieById(parseInt(req.params.id));
        if(req.body.categories !== undefined){
            const updatedCategoryIds = req.body.categories.map((category: type.Category) => category.id);
            const oldCategoryIds = await Promise.all(movie.related('categories').toJSON().map((category: type.Category) => category.id));
            await movie.categories().detach(oldCategoryIds, {transacting: trx});
            for(const updatedCategoryId of updatedCategoryIds){
                if(await new MovieCategory({id: updatedCategoryId}).checkIfExists(trx)){
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
        }else{
            await movie.save(req.body, {transacting: trx, method: 'update'});
        }

        await movie.save({posterId}, {transacting: trx, method: 'update'});

        if(oldPosterPath && oldPosterPath !== req.file.path){
            await deleteFile(oldPosterPath);
        }
    });
};

async function DeleteMovie(req: express.Request){
    await knex.transaction(async trx => {
        const movie = await fetchMovieById(parseInt(req.params.id));
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
};

export const getMovies = async (req: express.Request, res: express.Response) => {
    const result = await fetchMovies(req);
    res.json(result);
};

export const getMovieCategories = async (req: express.Request, res: express.Response) => {
    const movieCategories = await new MovieCategory().fetchAll();
    res.json(movieCategories);
};

export const getMovieById = async (req: express.Request, res: express.Response) => {
    const movie = await fetchMovieById(parseInt(req.params.id));
    if(!movie){
        throw 'Movie not found.';
    }
    res.json(movie);
};

export const postMovie = async (req: express.Request, res: express.Response) => {
    const id = await saveMovie(req);
    const newMovie = await fetchMovieById(id);
    res.json(newMovie);
};

export const updateMovie = async (req: express.Request, res: express.Response) => {
    await handler.handleMovieUpdatingExceptions(req);
    await UpdateMovie(req);
    const updatedMovie = await fetchMovieById(parseInt(req.params.id));
    res.json(updatedMovie);
};

export const deleteMovie = async (req: express.Request, res: express.Response) => {
    await handler.handleMovieDeletionExceptions(req);
    await DeleteMovie(req);
    res.status(204).send();
};


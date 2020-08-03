import { knex } from '../utilities/knexconfig';
import express from 'express';
import { paginate, getLength } from '../utilities/paginate';
import { Movies } from '../entities/movies';
import { ProductionCompanies } from '../entities/production_companies';
import { MovieCategories } from '../entities/movie_categories';
import { MoviesMovieCategories } from '../entities/movies_movie_categories';
import { isNull } from 'util';
import { moveSync } from 'fs-extra';

export const getMovies = async (req: express.Request, res: express.Response) => {
    const reg = new RegExp('^[0-9]+');
    const length = await getLength('movies');
    const page = parseInt(reg.test(String(req.query.page))? String(req.query.page) : '1', 10) || 1;
    const pageSize = parseInt(reg.test(String(req.query.pageSize))? String(req.query.pageSize) : '10', 10) || 10;

    const result = await paginate('movies', page, pageSize, length);

    if(result && !result.results.length){
        res.status(404).send('Page not found');
        return;
    }
    if(result){
        res.send(result);
    }
};

export const getMovieCategories = async (req: express.Request, res: express.Response) => {
    // const rows = await knex.from('movie_categories').select('*');
    const rows = (await (MovieCategories.forge<MovieCategories>().fetchAll())).map(row => row.attributes);
    res.json(rows);
};

export const getMovieById = async (req: express.Request, res: express.Response) => {
    /*const movie = await knex.from('movies')
                    .join('production_companies', 'movies.ProductionCompanyId', '=', 'production_companies.id')
                    .select('movies.*', 'production_companies.name as ProductionCompanyName')
                    .where('movies.id', req.params.id)
                    .first();*/

    /*const categories = await knex.from('movies_movie_categories')
                        .join('movie_categories', 'movies_movie_categories.categoryId', '=', 'movie_categories.id')
                        .select('movies_movie_categories.categoryId as id', 'movie_categories.category as name')
                        .where('movies_movie_categories.movieId', movie.id);*/
    // throw new Error('31337');
    const query = await Movies.forge<Movies>({id:req.params.id}).fetch({
        require:false,
        withRelated: ['productionCompanies']
    });

    if(!query){
        res.status(404).send('Movie not found');
        return;
    }

    const movie = query.attributes;
    movie.ProductionCompanyName = query.related('productionCompanies').get('name');

    const categories = await MoviesMovieCategories.getCategoriesIds(parseInt(movie.id, 10));
    const result = await Promise.all(
        categories.map(async (category: any) => {
            return {
                id: category.categoryId,
                name: await MovieCategories.getCategoryNameById(category.categoryId)
            };
        })
    );

    if(result){
        movie.categories = result;
        res.json(movie);
    }
};

async function checkIfCategoryExists(category: any){
    // const find = await knex.from('movie_categories').where({ id: category.id }).first();
    const find = await MovieCategories.forge<MovieCategories>({id: category.id}).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export const postMovie = async (req: express.Request, res: express.Response) => {
    if(!req.body.title){
        res.status(400).send('Bad request');
        return;
    }

    const movie: any = {
        title: req.body.title,
        description: req.body.description,
        runtime: req.body.runtime,
        releaseDate: req.body.releaseDate,
        budget: req.body.budget,
        gross: req.body.gross,
        overallRating: req.body.overallRating,
        ProductionCompanyId: req.body.ProductionCompanyId
    };

    const newCategories: any[] = [];
    let id;

    await knex.transaction(async trx => {
        // id = await knex('movies').transacting(trx).insert(movie);
        id = (await new Movies(movie).save(undefined, {transacting: trx, method: 'insert'})).get('id');
        movie.id = id;
        if(req.body.hasOwnProperty('categories')){
            const categories = req.body.categories;
            for(const category of categories){
                if(await checkIfCategoryExists(category)){
                    newCategories.push(category);
                    const entry = {
                        movieId: id,
                        categoryId: category.id
                    };
                    await knex('movies_movie_categories').transacting(trx).insert(entry);       
                    // await new MoviesMovieCategories(entry).save(undefined, {transacting: trx, method: 'insert'});    //nu merge desi pentru Movies merge aceeasi sintaxa
                }
            }
        }
    });
    const newEntry = (await Movies.forge<Movies>({id}).fetch()).attributes;
    newEntry.categories = newCategories;

    res.send(newEntry);
};

async function checkIfMovieExists(id: number){
    // const find = await knex.from('movies').where({ id }).first();
    const find = await Movies.forge<Movies>({id}).fetch();
    if(!find){
        return false;
    }
    return true;
}

export const updateMovie = async (req: express.Request, res: express.Response) => {
    if(!await checkIfMovieExists(parseInt(req.params.id, 10))){
        res.send(`Canot update movie with id ${req.params.id} because it does not exist in the database`);
        return;
    }
    const finalCategories: any[] = [];
    await knex.transaction(async trx => {
        if(req.body.hasOwnProperty('categories')){
            const updatedCategories = req.body.categories;
            // await knex('movies_movie_categories').transacting(trx).where('movieId', req.params.id).del();
            await new MoviesMovieCategories().where({movieId: req.params.id}).destroy({transacting: trx});
            for(const updatedCategory of updatedCategories){
                if(await checkIfCategoryExists(updatedCategory)){
                    finalCategories.push(updatedCategory);
                    const newCategory = {
                        movieId: req.params.id,
                        categoryId: updatedCategory.id
                    };
                    await knex('movies_movie_categories').transacting(trx).insert(newCategory);
                    // await new MoviesMovieCategories().save(newCategory, {transacting: trx, method: 'insert'});   //nu merge desi pentru Movies merge aceeasi sintaxa
                }
            }
            delete req.body.categories;
        }

        // await knex('movies').transacting(trx).where('id', req.params.id).update(req.body);
        await new Movies({id: req.params.id}).save(req.body, {transacting: trx, method: 'update'});
    });
    // const updatedMovie = await knex.from('movies').select('*').where('id', req.params.id).first();
    const updatedMovie = (await new Movies({id: req.params.id}).fetch()).attributes;
    updatedMovie.categories = finalCategories;
    res.send(updatedMovie);
};

export const deleteMovie = async (req: express.Request, res: express.Response) => {
    await knex.transaction(async trx => {
        // await knex('movies_movie_categories').transacting(trx).where('movieId', req.params.id).del();
        // await knex('movies').transacting(trx).where('id', req.params.id).del();
        await new MoviesMovieCategories().where({movieId: req.params.id}).destroy({transacting: trx});
        await new Movies({id: req.params.id}).destroy({transacting: trx});
    });
    res.status(204).send();
};


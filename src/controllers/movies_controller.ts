import { knex } from '../utilities/knexconfig';
import express from 'express';
import { paginate, getLength } from '../utilities/paginate';

export const getMovies = async (req: express.Request, res: express.Response) => {
    const reg = new RegExp('^[0-9]+');
    const length = await getLength('movies');
    const page = parseInt(reg.test(String(req.query.page))? String(req.query.page) : '1', 10) || 1;
    const pageSize = parseInt(reg.test(String(req.query.pageSize))? String(req.query.pageSize) : String(length), 10) || length;

    const result = await paginate('movies', page, pageSize, length);

    if(!result.results.length){
        res.status(404).send('Page not found');
        return;
    }

    res.send(result);
};

export const getMovieCategories = async (req: express.Request, res: express.Response) => {
    const rows = await knex.from('movie_categories').select('*');
    res.send(rows);
};

export const getMovieById = async (req: express.Request, res: express.Response) => {
    const movie = await knex.from('movies')
                    .join('production_companies', 'movies.ProductionCompanyId', '=', 'production_companies.id')
                    .select('movies.*', 'production_companies.name as ProductionCompanyName')
                    .where('movies.id', req.params.id)
                    .first();

    if(!movie){
        res.status(404).send('Movie not found');
        return;
    }

    const categories = await knex.from('movies_movie_categories')
                        .join('movie_categories', 'movies_movie_categories.categoryId', '=', 'movie_categories.id')
                        .select('movies_movie_categories.movieId', 'movies_movie_categories.categoryId as id', 'movie_categories.category as name')
                        .where('movies_movie_categories.movieId', movie.id);

    categories.forEach(category => delete category.movieId);
    movie.categories = categories;

    res.send(movie);
};

interface CategoryTemplate{
    id: number,
    name: string
};

async function checkIfCategoryExists(category: CategoryTemplate){
    const find = await knex.from('movie_categories').where({ id: category.id }).first();
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

    const movie = {
        title: req.body.title,
        description: req.body.description,
        runtime: req.body.runtime,
        releaseDate: req.body.releaseDate,
        budget: req.body.budget,
        gross: req.body.gross,
        overallRating: req.body.overallRating,
        ProductionCompanyId: req.body.ProductionCompanyId
    };

    const id = await knex('movies').insert(movie);

    if(req.body.hasOwnProperty('categories')){
        const categories = req.body.categories;

        for(const category of categories){
            if(await checkIfCategoryExists(category)){
                const entry = {
                    movieId: id,
                    categoryId: category.id
                };
                await knex('movies_movie_categories').insert(entry);
            }
        }
    }

    res.send('POST request received');
};

export const deleteMovie = async (req: express.Request, res: express.Response) => {
    await knex.transaction(async  trx => {
        await knex('movies_movie_categories').transacting(trx).where('movieId', req.params.id).del();
        await trx.commit();
    });
    await knex('movies').where('id', req.params.id).del();
    res.send('DELETE request received');
};


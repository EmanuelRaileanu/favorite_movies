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
    res.json(result);
};

export const getMovieCategories = async (req: express.Request, res: express.Response) => {
    const rows = await knex.from('movie_categories').select('*');
    res.json(rows);
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
                        .select('movies_movie_categories.categoryId as id', 'movie_categories.category as name')
                        .where('movies_movie_categories.movieId', movie.id);
    // throw new Error('31337');
    movie.categories = categories;
    res.json(movie);
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
        id = await knex('movies').transacting(trx).insert(movie);
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
                }
            }
        }
    });
    const newEntry = await knex.from('movies').select('*').where('id', id).first();
    newEntry.categories = newCategories;

    res.send(newEntry);
};

async function checkIfMovieExists(id: number){
    const find = await knex.from('movies').where({ id }).first();
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
            await knex('movies_movie_categories').transacting(trx).where('movieId', req.params.id).del();
            for(const updatedCategory of updatedCategories){
                if(await checkIfCategoryExists(updatedCategory)){
                    finalCategories.push(updatedCategory);
                    const newCategory = {
                        movieId: req.params.id,
                        categoryId: updatedCategory.id
                    };
                    await knex('movies_movie_categories').transacting(trx).insert(newCategory);
                }
            }
            delete req.body.categories;
        }

        await knex('movies').transacting(trx).where('id', req.params.id).update(req.body);
    });
    const updatedMovie = await knex.from('movies').select('*').where('id', req.params.id).first();
    updatedMovie.categories = finalCategories;
    res.send(updatedMovie);
};

export const deleteMovie = async (req: express.Request, res: express.Response) => {
    await knex.transaction(async trx => {
        await knex('movies_movie_categories').transacting(trx).where('movieId', req.params.id).del();
        await knex('movies').transacting(trx).where('id', req.params.id).del();
    });
    res.status(204).send();
};


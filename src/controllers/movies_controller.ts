import { knex } from '../utilities/knexconfig';
import express from 'express';
import { paginate, getLength } from '../utilities/paginate';
import { Movie } from '../entities/movies';
import { MovieCategory } from '../entities/movie_categories';

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
    const rows = (await (MovieCategory.forge<MovieCategory>().fetchAll())).map(row => row.attributes);
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
    const query = await Movie.forge<Movie>({id:req.params.id}).fetch({
        require:false,
        withRelated: ['productionCompanies', 'categories']
    });

    if(!query){
        res.status(404).send('Movie not found');
        return;
    }

    const movie = query.toJSON();
    movie.ProductionCompanyName = query.related('productionCompanies').get('name');

    const categories = await query.related('categories').toJSON();
    const result = await Promise.all(
        categories.map(async (category: any) => {
            return {
                id: category.id,
                name: category.category
            };
        })
    );

    if(result){
        movie.categories = result;
        res.json(movie);
    }
};

async function checkIfCategoryExists(categoryId: number){
    // const find = await knex.from('movie_categories').where({ id: category.id }).first();
    const find = await MovieCategory.forge<MovieCategory>({id: categoryId}).fetch({require: false});
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
        id = (await new Movie().save(movie, {transacting: trx, method: 'insert'})).get('id');
        if(req.body.hasOwnProperty('categories')){
            let categoryIds;
            categoryIds = (req.body.categories.map((category: any) => category.id));
            for(let i = 0; i < categoryIds.length; i++){
                if(!await checkIfCategoryExists(categoryIds[i])){
                    categoryIds.splice(i, 1);
                }
            }
            await new Movie({id}).categories().attach(categoryIds, {transacting:trx});
        }
    });
    let newEntry;
    newEntry = (await new Movie({id}).fetch({
        require: false,
        withRelated: ['categories']
    })).toJSON();
    newEntry.categories = newEntry.categories.map((cat: any) => {
        return{
            id: cat.id,
            name: cat.category
        };
    });
    res.send(newEntry);
};

async function checkIfMovieExists(id: number){
    // const find = await knex.from('movies').where({ id }).first();
    const find = await Movie.forge<Movie>({id}).fetch();
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
    const finalCategoryIds: any[] = [];
    await knex.transaction(async trx => {
        if(req.body.hasOwnProperty('categories')){
            const updatedCategoryIds = req.body.categories.map((cat: any) => cat.id);
            // await knex('movies_movie_categories').transacting(trx).where('movieId', req.params.id).del();
            const movie = await new Movie({id: req.params.id}).fetch({
                require: false,
                withRelated: ['categories']
            });
            const oldCategoryIds = await Promise.all(movie.related('categories').toJSON().map((category: any) => category.id));
            await movie.categories().detach(oldCategoryIds, {transacting: trx});
            for(const updatedCategoryId of updatedCategoryIds){
                if(await checkIfCategoryExists(updatedCategoryId)){
                    finalCategoryIds.push(updatedCategoryId);
                    /*const newCategory = {
                        movieId: req.params.id,
                        categoryId: updatedCategory.id
                    };
                    await knex('movies_movie_categories').transacting(trx).insert(newCategory);*/
                }
            }
            await movie.categories().attach(finalCategoryIds, {transacting: trx});
            delete req.body.categories;
        }

        // await knex('movies').transacting(trx).where('id', req.params.id).update(req.body);
        await new Movie({id: req.params.id}).save(req.body, {transacting: trx, method: 'update'});
    });
    // const updatedMovie = await knex.from('movies').select('*').where('id', req.params.id).first();
    const updatedMovie = (await new Movie({id: req.params.id}).fetch({
        require: false,
        withRelated: ['categories']
    })).toJSON();
    updatedMovie.categories = updatedMovie.categories.map((c: any) => {
        return{
            id: c.id,
            name: c.category
        };
    });
    res.send(updatedMovie);
};

export const deleteMovie = async (req: express.Request, res: express.Response) => {
    await knex.transaction(async trx => {
        // await knex('movies_movie_categories').transacting(trx).where('movieId', req.params.id).del();
        // await knex('movies').transacting(trx).where('id', req.params.id).del();
        const movie = await new Movie({id: req.params.id}).fetch({
            require: false,
            withRelated: ['categories']
        });
        const oldCategoryIds = await Promise.all(movie.related('categories').toJSON().map((category: any) => category.id));
        await movie.categories().detach(oldCategoryIds, {transacting: trx});
        await movie.destroy({transacting: trx});
    });
    res.status(204).send();
};


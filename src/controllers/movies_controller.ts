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
        res.status(404).json('Page not found');
        return;
    }

    if(result){
        res.json(result);
    }
};

export const getMovieCategories = async (req: express.Request, res: express.Response) => {
    const rows = (await new MovieCategory().fetchAll()).map(row => row.attributes);
    res.json(rows);
};

export const getMovieById = async (req: express.Request, res: express.Response) => {
    const movie = (await new Movie({id:req.params.id}).fetch({
        require:false,
        withRelated: ['productionCompany', 'categories']
    })).toJSON();

    if(!movie){
        res.status(404).json('Movie not found');
        return;
    }

    res.json(movie);
};

async function checkIfCategoryExists(categoryId: number){
    const find = await new MovieCategory({id: categoryId}).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export const postMovie = async (req: express.Request, res: express.Response) => {
    if(!req.body.title){
        res.status(400).json('Bad request');
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
        withRelated: ['productionCompany', 'categories']
    })).toJSON();

    res.json(newEntry);
};

async function checkIfMovieExists(id: number){
    const find = await new Movie({id}).fetch();
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
            const movie = await new Movie({id: req.params.id}).fetch({
                require: false,
                withRelated: ['categories']
            });
            const oldCategoryIds = await Promise.all(movie.related('categories').toJSON().map((category: any) => category.id));
            await movie.categories().detach(oldCategoryIds, {transacting: trx});
            for(const updatedCategoryId of updatedCategoryIds){
                if(await checkIfCategoryExists(updatedCategoryId)){
                    finalCategoryIds.push(updatedCategoryId);
                }
            }
            await movie.categories().attach(finalCategoryIds, {transacting: trx});
            delete req.body.categories;
        }

        await new Movie({id: req.params.id}).save(req.body, {transacting: trx, method: 'update'});
    });

    const updatedMovie = (await new Movie({id: req.params.id}).fetch({
        require: false,
        withRelated: ['productionCompany', 'categories']
    })).toJSON();

    res.json(updatedMovie);
};

export const deleteMovie = async (req: express.Request, res: express.Response) => {
    if(!checkIfMovieExists(parseInt(req.params.id, 10))){
        res.status(404).json('Movie not found');
        return;
    }
    await knex.transaction(async trx => {
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


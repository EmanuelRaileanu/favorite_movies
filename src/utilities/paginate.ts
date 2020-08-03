import dotenv from 'dotenv';
import Knex from 'knex';
import * as config from '../../knexfile.js';
import { Movies } from '../entities/movies';
import { ProductionCompanies } from '../entities/production_companies';
import { MovieCategories } from '../entities/movie_categories';
import { MoviesMovieCategories } from '../entities/movies_movie_categories';

dotenv.config();

const knex = Knex(config.development);

export const getLength = async (table: string) => parseInt(String((await knex(table).count('id'))[0]['count(`id`)']), 10);

export const paginate = async (table: string, page: number, pageSize: number, length: number) => {
    const pageCount = Math.ceil(length / pageSize);
    /*rows = await knex.from(table).join('production_companies', 'movies.ProductionCompanyId', '=', 'production_companies.id')
                        .select('movies.*', 'production_companies.name as ProductionCompanyName')
                        .offset((page - 1) * pageSize)
                        .limit(pageSize);*/

    const query = await Movies.forge<Movies>().fetchAll({
        require:false,
        withRelated: ['productionCompanies']
    });

    const rows = await Promise.all(query.map(async movie => {
        movie.attributes.ProductionCompanyName = await movie.related('productionCompanies').get('name');
        return movie.attributes;
    }));

    const promise = await Promise.all(rows.map(async row => {

        const categories = await MoviesMovieCategories.getCategoriesIds(parseInt(row.id, 10));
        const result = await Promise.all(
            categories.map(async (category: any) => {
                return {
                    id: category.categoryId,
                    name: await MovieCategories.getCategoryNameById(category.categoryId)
                };
            })
        );
        if(result){
            row.categories = result;
        }
    }));

    /*const categories = await knex.from('movies_movie_categories')
                        .join('movie_categories', 'movies_movie_categories.categoryId', '=', 'movie_categories.id')
                        .select('movies_movie_categories.movieId', 'movies_movie_categories.categoryId as id', 'movie_categories.category as name')
                        .whereIn('movies_movie_categories.movieId', rows.map(r => r.id));

    let filteredCategoryList;
    for(const row of rows){
        filteredCategoryList = categories.filter(c => c.movieId === row.id);
        filteredCategoryList.forEach(category => delete category.movieId);
        row.categories = filteredCategoryList;
    }*/

    const pagination = {
        page,
        pageSize,
        pageCount
    };

    if(await Promise.all([rows, promise])){
        return {
            results: rows,
            pagination
        };
    }
};


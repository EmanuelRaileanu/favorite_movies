import dotenv from 'dotenv';
import Knex from 'knex';
import * as config from '../../knexfile.js';
import { Movies } from '../entities/movies';
import { ProductionCompanies } from '../entities/production_companies';
import { MovieCategories } from '../entities/movie_categories';
import { MoviesMovieCategories } from '../entities/movies_movie_categories';

dotenv.config();

const knex = Knex(config.development);

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export const getLength = async (table: string) => parseInt(String((await knex(table).count('id'))[0]['count(`id`)']), 10);

export const paginate = async (table: string, page: number, pageSize: number, length: number) => {
    const pageCount = Math.ceil(length / pageSize);
    let rows: any[];
    if(table === 'movies'){

        /*rows = await knex.from(table).join('production_companies', 'movies.ProductionCompanyId', '=', 'production_companies.id')
                            .select('movies.*', 'production_companies.name as ProductionCompanyName')
                            .offset((page - 1) * pageSize)
                            .limit(pageSize);*/

        rows = await Movies.getMovies(page, pageSize);

        rows.forEach(async row => {
            row.ProductionCompanyName = await ProductionCompanies.getProductionCompanyNameById(parseInt(row.ProductionCompanyId, 10));

            const categories = await MoviesMovieCategories.getCategoryId(parseInt(row.id, 10));
            categories.forEach(async (category: any) => {
                category.id = category.categoryId;
                delete category.categoryId;
                delete category.movieId;
                category.name = await MovieCategories.getCategoryNameById(category.id);
            });
            setTimeout(() => {
                    row.categories = categories;
                }, 5
            );
        });

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
    }
    else{
        rows = await knex.from(table).select(table.concat('.*'))
                    .join('movies',  table.concat('.id'), '=', 'movies.ProductionCompanyId')
                    .groupBy(table.concat('.id'))
                    .count('movies.ProductionCompanyId as totalMoviesMade')
                    .offset((page - 1) * pageSize)
                    .limit(pageSize);
    }

    const pagination = {
        page,
        pageSize,
        pageCount
    };

    return {
        results: rows,
        pagination
    };
};


import dotenv from 'dotenv';
import Knex from 'knex';
import * as config from '../../knexfile.js';
import { Movie } from '../entities/movies';

dotenv.config();

const knex = Knex(config.development);

export const getLength = async (table: string) => parseInt(String((await knex(table).count('id'))[0]['count(`id`)']), 10);

export const paginate = async (table: string, page: number, pageSize: number, length: number) => {
    const pageCount = Math.ceil(length / pageSize);
    /*rows = await knex.from(table).join('production_companies', 'Movie.ProductionCompanyId', '=', 'production_companies.id')
                        .select('Movie.*', 'production_companies.name as ProductionCompanyName')
                        .offset((page - 1) * pageSize)
                        .limit(pageSize);*/

    const query = await Movie.forge<Movie>().fetchAll({
        require:false,
        withRelated: ['productionCompanies', 'categories']
    });

    const rows = await Promise.all(query.map(async movie => {
        movie.attributes.ProductionCompanyName = await movie.related('productionCompanies').get('name');
        movie.attributes.categories = await movie.related('categories').toJSON().map((c: any) => {
            return {
                id: c.id,
                name: c.category
            };
        });
        return movie.attributes;
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

    if(await Promise.resolve(rows)){
        return {
            results: rows,
            pagination
        };
    }
};


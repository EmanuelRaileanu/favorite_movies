import dotenv from 'dotenv';
import Knex from 'knex';
import * as config from '../../knexfile.js';

dotenv.config();

const knex = Knex(config.development);

export const getLength = async (table: string) => parseInt(String((await knex(table).count('id'))[0]['count(`id`)']), 10);

export const paginate = async (table: string, page: number, pageSize: number, length: number) => {
    const pageCount = Math.ceil(length / pageSize);
    let rows: any[];
    if(table === 'movies'){
        rows = await knex.from(table).join('production_companies', 'movies.ProductionCompanyId', '=', 'production_companies.id')
                            .select('movies.*', 'production_companies.name as ProductionCompanyName')
                            .offset((page - 1) * pageSize)
                            .limit(pageSize);
        // let filteredCategoryList;
        for(const row of rows){
            const categories = await knex.from('movies_movie_categories')
                        .join('movie_categories', 'movies_movie_categories.categoryId', '=', 'movie_categories.id')
                        .select('movies_movie_categories.movieId', 'movies_movie_categories.categoryId as id', 'movie_categories.category as name')
                        .where('movies_movie_categories.movieId', row.id);
            categories.forEach(category => delete category.movieId);
            row.categories = categories;
        }
    }
    else{
        rows = await knex.from(table).select('*')
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


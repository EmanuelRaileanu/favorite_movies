import dotenv from 'dotenv';
import Knex from 'knex';
import * as config from '../../knexfile.js';

dotenv.config();

const knex = Knex(config.development);

export const paginate = async (table: string, page: number, pageSize: number) => {
    const length = parseInt(String((await knex(table).count('id'))[0]['count(`id`)']), 10);
    const pageCount = Math.ceil(length / pageSize);
    const rows = await knex.from(table).select("*").offset((page - 1) * pageSize).limit(pageSize);

    if(page > pageCount || page <= 0){
        return 404;
    }

    const pagination = {
        page,
        pageSize,
        pageCount
    };

    return {
        pagination,
        results: rows
    };
};

import dotenv from 'dotenv';
import Knex from 'knex';
import * as config from '../../knexfile.js';
import { Movie } from '../entities/movies';

dotenv.config();

const knex = Knex(config.development);

export const getLength = async (table: string) => parseInt(String((await knex(table).count('id'))[0]['count(`id`)']), 10);

export const paginate = async (table: string, page: number, pageSize: number, length: number) => {
    const pageCount = Math.ceil(length / pageSize);

    const rows = (await new Movie().fetchAll({
        require:false,
        withRelated: ['productionCompany', 'categories', 'poster', 'actors']
    })).toJSON();

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


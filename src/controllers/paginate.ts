import dotenv from 'dotenv';
import Knex from 'knex';
import * as config from '../../knexfile.js';
import express from 'express';

dotenv.config();

const knex = Knex(config.development);

export const paginate = async (req: express.Request, res: express.Response, table: string) => {
    const reg = new RegExp('^[0-9]$');
    const length = parseInt(String((await knex(table).count('id'))[0]['count(`id`)']), 10);
    const page = parseInt(reg.test(String(req.query.page))? String(req.query.page) : '1', 10) || 1;
    const pageSize = parseInt(reg.test(String(req.query.pageSize))? String(req.query.pageSize) : String(length), 10) || length;
    const pageCount = Math.ceil(length / pageSize);
    const rows = await knex.from(table).select("*").offset((page - 1) * pageSize).limit(pageSize);

    if(page > pageCount){
        res.status(404).send('Page not found');
        return;
    }

    const pagination = {
        page,
        pageSize,
        pageCount
    };

    res.send({
        pagination,
        results: rows
    });
};

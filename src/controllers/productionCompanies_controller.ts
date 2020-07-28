import dotenv from 'dotenv';
import Knex from 'knex';
import * as config from '../../knexfile.js';
import express from 'express';
import { rawListeners } from 'process';

dotenv.config();

const knex = Knex(config.development);

export const getProductionCompanies = async (req: express.Request, res: express.Response) => {
    const length = parseInt(String((await knex('production_companies').count('id'))[0]['count(`id`)']), 10);
    const page = parseInt(String(req.query.page), 10) || 1;
    const pageSize = parseInt(String(req.query.pageSize), 10) || length;
    const pageCount = Math.ceil(length / pageSize);

    const rows = await knex.from('production_companies').select("*").offset((page - 1) * pageSize).limit(pageSize);

    if(page > pageCount){
        res.status(404).send('Page not found');
        return;
    }

    const obj = {
        page,
        pageSize,
        pageCount
    };

    res.send([obj].concat(rows));
};

export const getProductionCompanyById = async (req: express.Request, res: express.Response) => {
    const company = (await knex('production_companies').where('id', req.params.id))[0];

    if(!company)
        res.status(404).send('Production company not found');

    res.send(company);
};

export const postProductionCompany = async (req: express.Request, res: express.Response) => {
    if(!req.body.name){
        res.status(400).send('Bad request');
        return;
    }

    const productionCompany = {
        name: req.body.name
    };

    await knex('production_companies').insert(productionCompany);

    res.send('POST request received');
};

export const deleteProductionCompany = async (req: express.Request, res: express.Response) => {
    await knex('production_companies').where('id', req.params.id).del();
    res.send('DELETE request received');
};
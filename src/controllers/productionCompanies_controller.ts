import dotenv from 'dotenv';
import Knex from 'knex';
import * as config from '../../knexfile.js';
import express from 'express';
import { rawListeners } from 'process';

dotenv.config();

const knex = Knex(config.development);

export const getProductionCompanies = async (req: express.Request, res: express.Response) => {
    const rows = await knex.from('production_companies').select('*');

    const page = parseInt(String(req.query.page), 10);
    const pageSize = parseInt(String(req.query.pageSize), 10);
    const pageCount = Math.ceil(rows.length / pageSize);

    if(page > pageCount){
        res.status(404).send('Page not found');
        return;
    }

    const obj = {
        page,
        pageSize,
        pageCount
    };

    res.send([obj].concat(rows.slice((page - 1) * pageSize, pageSize * page)));
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
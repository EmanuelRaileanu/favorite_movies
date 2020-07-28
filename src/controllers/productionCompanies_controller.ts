import dotenv from 'dotenv';
import Knex from 'knex';
import * as config from '../../knexfile.js';
import express from 'express';

dotenv.config();

const knex = Knex(config.development);

export const getProductionCompanies = async (req: express.Request, res: express.Response) => {
    const rows = await knex.from('production_companies').select('*');
    res.send(rows);
};

export const getProductionCompanyById = async (req: express.Request, res: express.Response) => {
    const rows = await knex.from('production_companies').select('*');
    const company = rows.find(c => c.id === parseInt(req.params.id, 10));

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
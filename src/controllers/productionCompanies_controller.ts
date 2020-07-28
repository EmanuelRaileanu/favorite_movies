import { knex } from '../utilities/knexconfig';
import express from 'express';
import { paginate, getLength } from '../utilities/paginate';

export const getProductionCompanies = async (req: express.Request, res: express.Response) => {
    const reg = new RegExp('^[0-9]$');
    const length = await getLength('production_companies');
    const page = parseInt(reg.test(String(req.query.page))? String(req.query.page) : '1', 10) || 1;
    const pageSize = parseInt(reg.test(String(req.query.pageSize))? String(req.query.pageSize) : String(length), 10) || length;

    const result = await paginate('production_companies', page, pageSize, length);

    if(parseInt(String(result), 10) === 404){
        res.status(404).send('Page not found');
        return;
    }

    res.send(result);
};

export const getProductionCompanyById = async (req: express.Request, res: express.Response) => {
    const company = (await knex('production_companies').where('id', req.params.id))[0];

    if(!company){
         res.status(404).send('Production company not found');
    }

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
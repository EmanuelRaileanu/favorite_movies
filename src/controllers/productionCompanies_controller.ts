import express from 'express';
import { ProductionCompany } from '../entities/production_companies';

export const getProductionCompanies = async (req: express.Request, res: express.Response) => {
    const productionCompanies = await new ProductionCompany().query(q => {
        q.join('movies', 'production_companies.id', '=', 'movies.ProductionCompanyId');
        q.groupBy('production_companies.id');
        q.select('production_companies.*');
        q.count('movies.ProductionCompanyId as totalMoviesMade');
    }).fetchAll();

    if(productionCompanies && !productionCompanies.length){
        res.status(404).json('Page not found');
        return;
    }
    
    if(productionCompanies){
        res.json(productionCompanies);
    }
};

export const getProductionCompanyById = async (req: express.Request, res: express.Response) => {
    const productionCompany = await new ProductionCompany({id: req.params.id}).query(q => {
        q.join('movies', 'production_companies.id', '=', 'movies.ProductionCompanyId');
        q.groupBy('production_companies.id');
        q.select('production_companies.*');
        q.count('movies.ProductionCompanyId as totalMoviesMade');
    }).fetch({require: false});

    if(!productionCompany){
        res.status(404).json('Production company not found');
        return;
    }

    res.json(productionCompany);
};

export const postProductionCompany = async (req: express.Request, res: express.Response) => {
    if(!req.body.name){
        res.status(400).json('Name is required');
        return;
    }

    const productionCompany = {
        name: req.body.name
    };

    const id =(await new ProductionCompany().save(productionCompany, {method: 'insert'})).get('id');

    const result = await new ProductionCompany({id}).fetch({require: false});
    res.json(result);
};

export const updateProductionCompany = async (req: express.Request, res: express.Response) => {
    if(!req.body.name){
        res.status(400).json('At least one filed is required');
        return;
    }
    const id =(await new ProductionCompany().where({id: req.params.id}).save({name: req.body.name}, {method: 'update'})).get('id');
    const updatedProductionCompany = await new ProductionCompany({id}).fetch({require: false});
    res.json(updatedProductionCompany);
};

export const deleteProductionCompany = async (req: express.Request, res: express.Response) => {
    await new ProductionCompany().where({id: req.params.id}).destroy();
    res.status(204).send();
};
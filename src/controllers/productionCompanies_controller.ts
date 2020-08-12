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
    }).fetch();

    if(!productionCompany){
        res.status(404).json('Production company not found');
        return;
    }

    res.json(productionCompany);
};

export const postProductionCompany = async (req: express.Request, res: express.Response) => {
    if(!req.body.name){
        res.status(400).json('Bad request');
        return;
    }

    const productionCompany = {
        name: req.body.name
    };

    const id = await new ProductionCompany().save(productionCompany, {method: 'insert'});

    const result = await new ProductionCompany({id}).fetch();

    res.json(result);
};

export const deleteProductionCompany = async (req: express.Request, res: express.Response) => {
    await new ProductionCompany().where({id: req.params.id}).destroy();
    res.status(204).send();
};
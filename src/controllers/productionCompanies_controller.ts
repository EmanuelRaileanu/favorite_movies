import { knex } from '../utilities/knexconfig';
import express from 'express';
import { ProductionCompanies } from '../entities/production_companies';

export const getProductionCompanies = async (req: express.Request, res: express.Response) => {
    /*rows = await knex.from(table).select(table.concat('.*'))
                    .join('movies',  table.concat('.id'), '=', 'movies.ProductionCompanyId')
                    .groupBy(table.concat('.id'))
                    .count('movies.ProductionCompanyId as totalMoviesMade')
                    .offset((page - 1) * pageSize)
                    .limit(pageSize);*/
    const query = await new ProductionCompanies().fetchAll({
        require: false,
        withRelated: ['movies']
    });

    const productionCompanies = await Promise.all(query.map(async q => {
        q.attributes.totalMoviesMade = await q.related('movies').toJSON().length;
        return q.attributes;
    }));

    /*const promise = Promise.all(productionCompanies.map(async productionCompany => {

        console.log(await productionCompany.related('movies'));
    }));*/

    if(productionCompanies && !productionCompanies.length){
        res.status(404).send('Page not found');
        return;
    }
    if(productionCompanies){
        res.send(productionCompanies);
    }
};

export const getProductionCompanyById = async (req: express.Request, res: express.Response) => {
    /*const company = await knex('production_companies').select('production_companies.*')
                .join('movies',  'production_companies.id', '=', 'movies.ProductionCompanyId')
                .groupBy('production_companies.id')
                .count('movies.ProductionCompanyId as totalMoviesMade')
                .where('production_companies.id', req.params.id).first();*/
    const company = await ProductionCompanies.getProductionCompanyById(parseInt(req.params.id, 10));

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

    // await knex('production_companies').insert(productionCompany);
    await new ProductionCompanies().save(productionCompany, {method: 'insert'});

    res.send('POST request received');
};

export const deleteProductionCompany = async (req: express.Request, res: express.Response) => {
    // await knex('production_companies').where('id', req.params.id).del();
    await new ProductionCompanies().where({id: req.params.id}).destroy();
    res.status(204).send();
};
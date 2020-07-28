import dotenv from 'dotenv';
import Knex from 'knex';
import * as config from '../../knexfile.js';
import express from 'express';

dotenv.config();

const knex = Knex(config.development);

export const getMovies = async (req: express.Request, res: express.Response) => {
    const rows = await knex.from('movies').select("*");

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

export const getMovieById = async (req: express.Request, res: express.Response) => {
    const movie = (await knex('movies').where('id', req.params.id))[0];
    if(!movie)
        res.status(404).send('Movie not found');
    res.send(movie);
};

export const postMovie = async (req: express.Request, res: express.Response) => {
    if(!req.body.title){
        res.status(400).send('Bad request');
        return;
    }

    const movie = {
        title: req.body.title,
        description: req.body.description,
        runtime: req.body.runtime,
        releaseDate: req.body.releaseDate,
        budget: req.body.budget,
        gross: req.body.gross,
        overallRating: req.body.overallRating,
        ProductionCompanyId: req.body.ProductionCompanyId
    };

    await knex('movies').insert(movie);

    res.send('POST request received');
};

export const deleteMovie = async (req: express.Request, res: express.Response) => {
    await knex('movies').where('id', req.params.id).del();
    res.send('DELETE request received');
};


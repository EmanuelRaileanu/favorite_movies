import dotenv from 'dotenv';
import Knex from 'knex';
import * as config from '../../knexfile.js';
import express from 'express';
import { paginate } from './paginate'

dotenv.config();

const knex = Knex(config.development);

export const getMovies = async (req: express.Request, res: express.Response) => {
    paginate(req, res, 'movies');
};

export const getMovieById = async (req: express.Request, res: express.Response) => {
    const movie = (await knex('movies').where('id', req.params.id))[0];

    if(!movie){
        res.status(404).send('Movie not found');
    }

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


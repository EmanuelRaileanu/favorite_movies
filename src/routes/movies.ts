import dotenv from 'dotenv';
import express from 'express';
import Knex from 'knex';
import {config} from '../knexconfig';

dotenv.config();

const knex = Knex(config);

export const register = (app: express.Application) => {

    app.get('/movies', (req, res) => {
        knex.from('movies').select("*")
        .then((rows) => {
                res.send(rows);
        }).catch((err) => { console.log( err); throw err });
    });

    app.get('/movies/:id', (req, res) => {
        knex.from('movies').select("*")
        .then((rows) => {
            const movie = rows.find(m => m.id === parseInt(req.params.id, 10));
            if(!movie) res.status(404).send('Movie not found');
            res.send(movie);
        }).catch((err) => { console.log( err); throw err });
    });

    app.post('/movies', (req, res) => {
        if(!req.body.title){
            res.status(400).send('Bad request');
            return;
        }

        const movies = {
            title: req.body.title,
            description: req.body.description,
            runtime: req.body.runtime,
            budget: req.body.budget,
            gross: req.body.gross,
            overallRating: req.body.overallRating
        };

        knex('movies').insert(movies)
        .then(() => console.log("data inserted"))
        .catch((err) => { console.log(err); throw err });
        res.send('POST request received');
    });

    app.delete('/movies/:id', (req, res) => {
        knex('movies').where('id', req.params.id)
            .del()
            .catch((err) => { res.status(404).send('Page not found'); throw err });
        res.send('DELETE request received');
    });

};
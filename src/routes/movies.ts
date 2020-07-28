import express from 'express';
import * as controller from '../controllers/movies_controller';

export const register = (app: express.Application) => {

    app.get('/movies', (req, res) => {
        controller.getMovies(req, res);
    });

    app.get('/movies/:id', (req, res) => {
        controller.getMovieById(req, res);
    });

    app.post('/movies', (req, res) => {
        controller.postMovie(req, res);
    });

    app.delete('/movies/:id', (req, res) => {
        controller.deleteMovie(req, res);
    });

};
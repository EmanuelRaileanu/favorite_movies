import express from 'express';
import * as controller from '../controllers/movies_controller';

export const register = (app: express.Application) => {
    app.get('/movies', controller.getMovies);

    app.get('/movies/:id', controller.getMovieById);

    app.post('/movies', controller.postMovie);

    app.delete('/movies/:id', controller.deleteMovie);
};
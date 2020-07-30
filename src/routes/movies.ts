import express from 'express';
import * as controller from '../controllers/movies_controller';
import { asyncMiddleware } from '../utilities/asyncMiddleware';

export const register = (app: express.Application) => {
    app.get('/movies', asyncMiddleware(controller.getMovies));

    app.post('/movies', asyncMiddleware(controller.postMovie));

    app.get('/movies/movie-categories', asyncMiddleware(controller.getMovieCategories));

    app.get('/movies/:id', asyncMiddleware(controller.getMovieById));

    app.put('/movies/:id', asyncMiddleware(controller.updateMovie));

    app.delete('/movies/:id', asyncMiddleware(controller.deleteMovie));
};
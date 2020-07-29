import express from 'express';
import * as controller from '../controllers/movies_controller';

export const register = (app: express.Application) => {
    app.get('/movies', controller.getMovies);

    app.post('/movies', controller.postMovie);

    app.get('/movies/movie-categories', controller.getMovieCategories);

    app.get('/movies/:id', controller.getMovieById);

    app.delete('/movies/:id', controller.deleteMovie);
};
import express from 'express';
import * as controller from '../controllers/movies_controller';
import asyncMiddleware from '../utilities/asyncMiddleware';
import { upload } from '../utilities/multerConfig';
import { validateMovieCreation, validateMovieUpdate } from '../validators/movieValidator';

export const register = (router: express.Router) => {
    router.get('/movies', asyncMiddleware(controller.getMovies));
    router.post('/movies', upload.single('moviePoster'), asyncMiddleware(validateMovieCreation), asyncMiddleware(controller.postMovie));
    router.get('/movies/movie-categories', asyncMiddleware(controller.getMovieCategories));
    router.get('/movies/:id', asyncMiddleware(controller.getMovieById));
    router.put('/movies/:id', upload.single('moviePoster'), asyncMiddleware(validateMovieUpdate), asyncMiddleware(controller.updateMovie));
    router.delete('/movies/:id', asyncMiddleware(controller.deleteMovie));
};
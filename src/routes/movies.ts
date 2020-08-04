import express from 'express';
import * as controller from '../controllers/movies_controller';
import { asyncMiddleware } from '../utilities/asyncMiddleware';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req: express.Request, file: any, cb: any) => {
        cb(null, './public/uploads/');
    },
    filename: (req: express.Request, file: any, cb: any) => {
        cb(null, new Date().toISOString() + file.originalname);
    },
});

const upload = multer({storage});

export const register = (app: express.Application) => {
    app.get('/movies', asyncMiddleware(controller.getMovies));

    app.post('/movies', upload.single('moviePoster'), asyncMiddleware(controller.postMovie));

    app.get('/movies/movie-categories', asyncMiddleware(controller.getMovieCategories));

    app.get('/movies/:id', asyncMiddleware(controller.getMovieById));

    app.put('/movies/:id', upload.single('moviePoster'), asyncMiddleware(controller.updateMovie));

    app.delete('/movies/:id', asyncMiddleware(controller.deleteMovie));
};
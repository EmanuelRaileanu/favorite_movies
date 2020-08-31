import express from 'express';
import { MovieCategory } from '../entities/movie_categories';
import * as db from '../utilities/moviesControllerFunctions';
import * as handler from '../utilities/exceptionHandlers';

export const getMovies = async (req: express.Request, res: express.Response) => {
    const result = await db.fetchMovies(req);
    res.json(result);
};

export const getMovieCategories = async (req: express.Request, res: express.Response) => {
    const movieCategories = await new MovieCategory().fetchAll();
    res.json(movieCategories);
};

export const getMovieById = async (req: express.Request, res: express.Response) => {
    const movie = await db.fetchMovieById(parseInt(req.params.id));
    await handler.handleGettingMovieByIdExceptions(movie);
    res.json(movie);
};

export const postMovie = async (req: express.Request, res: express.Response) => {
    await handler.handleMoviePostExceptions(req);
    const id = await db.saveMovie(req);
    const newMovie = await db.fetchMovieById(id);
    res.json(newMovie);
};

export const updateMovie = async (req: express.Request, res: express.Response) => {
    await handler.handleMovieUpdatingExceptions(req);
    await db.updateMovie(req);
    const updatedMovie = await db.fetchMovieById(parseInt(req.params.id));
    res.json(updatedMovie);
};

export const deleteMovie = async (req: express.Request, res: express.Response) => {
    await handler.handleMovieDeletionExceptions(req);
    await db.deleteMovie(req);
    res.status(204).send();
};


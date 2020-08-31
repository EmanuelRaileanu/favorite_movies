import express from 'express';
import * as type from './customTypes';
import Joi from 'joi';
import { MovieCategory } from '../entities/movie_categories';
import { Movie } from '../entities/movies';

export async function handleGettingMovieByIdExceptions(movie: type.Movie){
    if(!movie){
        throw 'Movie not found.';
    }
};

export async function handleMovieUpdatingExceptions(req: express.Request){
    if(!await new MovieCategory({id: parseInt(req.params.id, 10)}).checkIfExists()){
        throw `Canot update movie with id ${req.params.id} because it does not exist in the database.`;
    }
};

export async function handleMovieDeletionExceptions(req: express.Request){
    if(!new Movie({id: parseInt(req.params.id, 10)}).fetch({require: false})){
        throw 'Movie not found';
    }
};
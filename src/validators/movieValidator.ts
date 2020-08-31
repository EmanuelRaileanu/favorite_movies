import express from 'express';
import schemas from '../utilities/validationSchemas';

export async function validateMovieCreation(req: express.Request){
    await schemas.saveMovie.validateAsync(req.body);
};

export async function validateMovieUpdate(req: express.Request){
    await schemas.updateMovie.validateAsync(req.body);
};
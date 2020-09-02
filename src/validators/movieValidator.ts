import express from 'express';
import schemas from '../utilities/validationSchemas';

export async function validateMovieCreation(req: express.Request, res: express.Response, next: any){
    try{
        await schemas.saveMovie.validateAsync(req.body);
        next();
    }catch(err){
        res.json(err);
    }
    
};

export async function validateMovieUpdate(req: express.Request, res: express.Response, next: any){
    try{
        await schemas.updateMovie.validateAsync(req.body);
        next();
    }catch(err){
        res.json(err);
    }
};
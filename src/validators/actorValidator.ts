import express from 'express';
import schemas from '../utilities/validationSchemas';

export async function validateActorCreation(req: express.Request, res: express.Response, next: any){
    try{
        await schemas.saveActor.validateAsync(req.body);
        next();
    }catch(err){
        res.json(err);
    }
};

export async function validateActorUpdate(req: express.Request, res: express.Response, next: any){
    try{
        await schemas.updateActor.validateAsync(req.body);
        next();
    }catch(err){
        res.json(err);
    }
};
import express from 'express';
import schemas from '../utilities/validationSchemas';

export async function validateActorCreation(req: express.Request){
    await schemas.saveActor.validateAsync(req.body);
};

export async function validateActorUpdate(req: express.Request){
    await schemas.updateActor.validateAsync(req.body);
};
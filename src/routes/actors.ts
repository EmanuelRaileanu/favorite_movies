import express from 'express';
import * as controller from '../controllers/actors_controller';
import asyncMiddleware from '../utilities/asyncMiddleware';
import { upload } from '../utilities/multerConfig';
import { validateActorCreation, validateActorUpdate } from '../validators/actorValidator';

export const register = (router: express.Router) => {
    router.get('/actors', asyncMiddleware(controller.getActors));
    router.get('/actors/:id', asyncMiddleware(controller.getActorById));
    router.post('/actors',  asyncMiddleware(validateActorCreation), upload.single('actorPhoto'), asyncMiddleware(controller.postActor));
    router.delete('/actors/:id', asyncMiddleware(controller.deleteActor));
    router.put('/actors/:id', asyncMiddleware(validateActorCreation), upload.single('actorPhoto'), asyncMiddleware(controller.updateActor));
};
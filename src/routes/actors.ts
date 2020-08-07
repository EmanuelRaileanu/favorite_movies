import express from 'express';
import * as controller from '../controllers/actors_controller';
import { asyncMiddleware } from '../utilities/asyncMiddleware';
import { upload } from '../utilities/multerConfig';

export const register = (app: express.Application) => {
    app.get('/actors', asyncMiddleware(controller.getActors));
    app.get('/actors/:id', asyncMiddleware(controller.getActorById));
    app.post('/actors', upload.single('actorPhoto'), asyncMiddleware(controller.postActor));
    app.delete('/actors/:id', asyncMiddleware(controller.deleteActor));
    app.put('/actors/:id', upload.single('actorPhoto'), asyncMiddleware(controller.updateActor));
};
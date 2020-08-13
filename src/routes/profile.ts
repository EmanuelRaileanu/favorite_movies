import express from 'express';
import * as controller from '../controllers/profile_controller';
import asyncMiddleware from '../utilities/asyncMiddleware';

export const register = (router: express.Router) => {
    router.get('/profile', asyncMiddleware(controller.profile));
};
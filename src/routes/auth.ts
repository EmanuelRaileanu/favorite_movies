import express from 'express';
import * as controller from '../controllers/auth_controller';
import asyncMiddleware from '../utilities/asyncMiddleware';

export const register = (router: express.Router) => {
    router.post('/register', asyncMiddleware(controller.register));
    router.post('/login', asyncMiddleware(controller.login));
    router.patch('/logout', asyncMiddleware(controller.logout));
    router.patch('/confirmAccount/:email', asyncMiddleware(controller.confirmAccount));
    router.patch('/resetPassword/:email', asyncMiddleware(controller.sendPasswordResetRequest));
    router.patch('/resetPassword', asyncMiddleware(controller.resetPassword));
};
import express from 'express';
import * as controller from '../controllers/auth_controller';
import asyncMiddleware from '../utilities/asyncMiddleware';
import passport from 'passport';
import {googleAuth} from '../utilities/authMiddleware';
import {googleCallback} from '../controllers/auth_controller';
import joiMiddleware from '../utilities/joiMiddleware';
import schemas from '../utilities/joiSchemas';

export const register = (router: express.Router) => {
    router.post('/register', joiMiddleware(schemas.userRegister), asyncMiddleware(controller.register));
    router.post('/login', joiMiddleware(schemas.userLogin), asyncMiddleware(controller.login));
    router.put('/logout', passport.authenticate('bearer', { session: false }), asyncMiddleware(controller.logout));
    router.put('/confirmAccount', asyncMiddleware(controller.confirmAccount));
    router.put('/resetPassword', asyncMiddleware(controller.sendPasswordResetRequest));
    router.put('/changePassword', asyncMiddleware(controller.resetPassword));
    router.put('/resendConfirmationEmail', asyncMiddleware(controller.resendConfirmationEmail));
    router.get('/google', googleAuth);
    router.get('/google/callback', googleCallback);
};
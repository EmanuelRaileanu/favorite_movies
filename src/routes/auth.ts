import express from 'express';
import * as controller from '../controllers/auth_controller';
import asyncMiddleware from '../utilities/asyncMiddleware';
import passport from 'passport';
import {googleAuth} from '../utilities/authMiddleware';
import {googleCallback} from '../controllers/auth_controller';
import { validateRegisterRequest, validateLoginRequest } from '../validators/authValidator';

export const register = (router: express.Router) => {
    router.post('/register', validateRegisterRequest, asyncMiddleware(controller.register));
    router.post('/login', validateLoginRequest, asyncMiddleware(controller.login));
    router.post('/logout', passport.authenticate('bearer', { session: false }), asyncMiddleware(controller.logout));
    router.get('/confirm-account', asyncMiddleware(controller.confirmAccount));
    router.post('/reset-password', asyncMiddleware(controller.sendPasswordResetRequest));
    router.post('/change-password', asyncMiddleware(controller.changePassword));
    router.post('/resend-confirmation-email', asyncMiddleware(controller.resendConfirmationEmail));
    router.get('/google', googleAuth);
    router.get('/google/callback', googleCallback);
};
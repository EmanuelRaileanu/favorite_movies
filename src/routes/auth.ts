import express from 'express';
import * as controller from '../controllers/auth_controller';
import asyncMiddleware from '../utilities/asyncMiddleware';
import passport from 'passport';

export const register = (router: express.Router) => {
    router.post('/register', asyncMiddleware(controller.register));
    router.post('/login', asyncMiddleware(controller.login));
    router.put('/logout', passport.authenticate('bearer', { session: false }), asyncMiddleware(controller.logout));
    router.put('/confirmAccount', asyncMiddleware(controller.confirmAccount));
    router.put('/resetPassword', asyncMiddleware(controller.sendPasswordResetRequest));
    router.put('/changePassword', asyncMiddleware(controller.resetPassword));
    router.put('/resendConfirmationEmail', asyncMiddleware(controller.resendConfirmationEmail));
    router.get('/google', passport.authenticate('google', {scope: ['openid', 'email', 'profile']}));
    router.get('/google/callback', passport.authenticate('google', {session: false}), (req, res) => res.json(req.user));
};
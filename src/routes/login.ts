import express from 'express';
import * as controller from '../controllers/login_controller';

export const register = (router: express.Router) => {
    router.post('/login', controller.login);
};
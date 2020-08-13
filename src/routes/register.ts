import express from 'express';
import * as controller from '../controllers/auth_controller';

export const register = (router: express.Router) => {
    router.post('/register', controller.register);
};
import express from 'express';
import * as controller from '../controllers/register_controller';

export const register = (router: express.Router) => {
    router.post('/register', controller.register);
};
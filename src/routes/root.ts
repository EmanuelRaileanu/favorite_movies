import express from 'express';
import * as controller from '../controllers/root_controller';

export const register = (router: express.Router) => {
    router.get('/', controller.getRoot);
};


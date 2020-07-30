import express from 'express';
import * as controller from '../controllers/root_controller';

export const register = (app: express.Application) => {
    app.get('/', controller.getRoot);
};


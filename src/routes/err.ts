import express from 'express';
import * as controller from '../controllers/err_controller';

export const register = (app: express.Application) => {
    app.get('*', (req, res) =>{
        controller.getErr(req, res);
    });
};
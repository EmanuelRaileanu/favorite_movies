import express from 'express';
import Joi from 'joi';
import { exit, nextTick } from 'process';

const joiMiddleware = (schema: Joi.Schema) => 
     async (req: express.Request, res: express.Response, next: any) => {
        try {
            await schema.validateAsync(req.body);
            next()
        }catch(err){
            res.status(500).json(err.toString());
        }
    };
export default joiMiddleware;
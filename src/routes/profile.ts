import express from 'express';
import asyncMiddleware from '../utilities/asyncMiddleware';

export const register = (router: express.Router) => {
    router.get('/profile', asyncMiddleware((req: express.Request, res: express.Response) => res.json(req.user)));
};
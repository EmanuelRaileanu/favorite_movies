import express from 'express';
import { User } from '../entities/users';

export const profile = async (req: express.Request, res: express.Response) => {
    const user = await new User({bearerToken: req.headers.authorization?.split(' ')[1]}).fetch({require: false});
    res.json(user);
};
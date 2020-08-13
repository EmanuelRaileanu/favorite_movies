import express from 'express';
import { User } from '../entities/users';
import dotenv from 'dotenv';
import request from 'request';

dotenv.config();

export const login = async (req: express.Request, res: express.Response) => {
    const {email, password} = req.body;

    if(!email){
        res.json('Please enter your email.');
    }

    else if(!password){
        res.json('Please enter your password.')
    }

    const user = await new User({email, password}).fetch({require: false});

    if(!user){
        res.json('Incorrect email or password!');
    }

    res.json(user.get('bearerToken'));
};
import express from 'express';
import { User } from '../entities/users';
import crypto from 'crypto'; 

export const register = async (req: express.Request, res: express.Response) => {
    const {name, dateOfBirth, email, password, confirmPassword} = req.body;

    if(!name || !email || !password|| !confirmPassword || !dateOfBirth){
        res.status(400).json('Bad request!');
    }

    if(password.length < 5){
        res.json('The password should be at lest 5 characters long!');
    }

    if(password !== confirmPassword){
        res.json('Passwords do not match!');
    }

    if(await new User({email}).fetch({require: false})){
        res.json('An user with this email address already exists!');
    }

    const token = crypto.randomBytes(20).toString('hex');
    
    const userEntry = {
        email,
        password,
        name,
        dateOfBirth,
        bearerToken: token
    };

    await new User().save(userEntry, {method: 'insert'});

    res.json('Registered successfully!');
};

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
import express from 'express';
import { User } from '../entities/users';

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

    const auth = req.headers.authorization;
    if(!auth){
        res.json('Cannot get bearer token.');
    }
    const token = auth?.split(' ')[1];
    
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
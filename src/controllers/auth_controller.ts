import express from 'express';
import { User } from '../entities/users';
import crypto from 'crypto'; 
import { knex } from '../utilities/knexconfig';
import transporter from '../utilities/nodemailerConfig';

export const register = async (req: express.Request, res: express.Response) => {
    const {name, dateOfBirth, email, password, confirmPassword} = req.body;

    if(!name || !email || !password|| !confirmPassword || !dateOfBirth){
        res.status(400).json('Bad request!');
        return;
    }

    const dateReg = /^\d{4}([./-])\d{2}\1\d{2}$/;
    if(!dateOfBirth.match(dateReg)){
        res.json('Incorrect date format. Hint: YYYY-MM-DD');
        return;
    }

    if(password.length < 5){
        res.json('The password should be at lest 5 characters long!');
        return;
    }

    if(password !== confirmPassword){
        res.json('Passwords do not match!');
        return;
    }

    if(await new User({email}).fetch({require: false})){
        res.json('An user with this email address already exists!');
        return;
    }

    const info = await transporter.sendMail({
        from: "'Api', <mail@api.com>",
        to: email,
        subject: 'Confirm your account',
        text: `Please confirm your new account. Confirmation token: ${crypto.randomBytes(20).toString('hex')}`
    });
    
    const userEntry = {
        email,
        password,
        name,
        dateOfBirth
    };

    await new User().save(userEntry, {method: 'insert'});

    res.json('Registered successfully!');
};

export const login = async (req: express.Request, res: express.Response) => {
    const {email, password} = req.body;

    if(!email){
        res.json('Please enter your email.');
        return;
    }
    else if(!password){
        res.json('Please enter your password.');
        return;
    }
    
    if(!await (await new User({email, password}).fetch({require: false})).get('confirmationToken')){
        res.json('Failed to log in. Please confirm your account first.');
        return;
    }

    const token = crypto.randomBytes(20).toString('hex');
    let user: any;

    await knex.transaction(async trx => {
        user = await new User({email, password}).fetch({require: false, transacting: trx});
        await user.save({bearerToken: token}, {transacting: trx, method: 'update'});
    });

    res.json(user.get('bearerToken'));
};

export const logout = async (req:express.Request, res: express.Response) => {
    const user = await new User({bearerToken: req.headers.authorization?.split(' ')[1]}).fetch({require: false});
    if(!user){
        res.json('User not found!');
        return;
    }

    user.save({bearerToken: null}, {method: 'update'});

    res.json('Logged out successfully!');
};

export const confirmAccount = async (req:express.Request, res: express.Response) => {
    const confirmationToken = req.headers.authorization?.split(' ')[1];

    if(!await new User().where({email: req.params.email}).save({confirmationToken}, {method: 'update'})){
        res.json('Error: Account does not exist.');
        return;
    }
    
    res.json('Account confirmed');
};

export const sendPasswordResetRequest = async (req:express.Request, res: express.Response) => {
    const resetPasswordToken = crypto.randomBytes(20).toString('hex');
    if(!await new User().where({email: req.params.email}).save({resetPasswordToken}, {method: 'update'})){
        res.json('Error: Account does not exist.');
        return;
    }

    await transporter.sendMail({
        from: "'Api', <mail@api.com>",
        to: req.params.email,
        subject: 'Password reset',
        text: `Password reset token: ${resetPasswordToken}`
    });

    res.json('Password reset request sent. Please check your email.');
};

export const resetPassword = async (req:express.Request, res: express.Response) => {
    const resetPasswordToken = req.headers.authorization?.split(' ')[1];
    const {password, confirmPassword} = req.body;

    if(!resetPasswordToken){
        res.json('Error: No password reset request received.');
    }

    if(!password || !confirmPassword){
        res.status(400).json('Bad request!');
        return;
    }

    if(password.length < 5){
        res.json('The password should be at lest 5 characters long!');
        return;
    }

    if(password !== confirmPassword){
        res.json('Passwords do not match!');
        return;
    }

    await new User().where({resetPasswordToken}).save({password}, {method: 'update'});
    res.json('Password successfully changed!');
};

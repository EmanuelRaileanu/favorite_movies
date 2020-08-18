import express from 'express';
import { User } from '../entities/users';
import crypto from 'crypto'; 
import { knex } from '../utilities/knexconfig';
import transporter from '../utilities/nodemailerConfig';
import dotenv from 'dotenv';
import oauth2Client from '../utilities/oauth2ClientConfig';
import bcrypt from 'bcrypt';
const {google} = require('googleapis');

dotenv.config();

export const register = async (req: express.Request, res: express.Response) => {
    const {name, dateOfBirth, email, password, confirmPassword} = req.body;

    if(!name || !email || !password|| !confirmPassword || !dateOfBirth){
        res.status(400).json('Bad request!');
        return;
    }

    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!email.match(emailReg)){
        res.json('Invalid email format. Example format: emailaddress@gmail.com');
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

    const confirmationToken = crypto.randomBytes(20).toString('hex');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const userEntry = {
        email,
        password: hashedPassword,
        name,
        dateOfBirth, 
        confirmationToken
    };

    await new User().save(userEntry, {method: 'insert'});

    await transporter.sendMail({
        from: "'Api', <mail@api.com>",
        to: email,
        subject: 'Confirm your account',
        text: `Please confirm your new account. Confirmation token: ${confirmationToken}`
    });

    res.json('Registered successfully!');
};

export const login = async (req: express.Request, res: express.Response) => {
    const {email, password} = req.body;

    if(!email){
        res.json('Please enter your email.');
        return;
    }

    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!email.match(emailReg)){
        res.json('Invalid email format. Example format: emailaddress@gmail.com');
        return;
    }

    if(!password){
        res.json('Please enter your password.');
        return;
    }

    const user = await new User({email}).fetch({require: false});

    if(!user){
        res.json('Incorrect email!');
        return;
    }

    const checkIfPasswordIsCorrect = await bcrypt.compare(password, user.get('password'));

    if(!checkIfPasswordIsCorrect){
        res.json('Incorrect password!');
        return;
    }
    
    if(!user.get('isConfirmed')){
        res.json('Failed to log in. Please confirm your account first.');
        return;
    }

    const bearerToken = crypto.randomBytes(20).toString('hex');

    await user.save({bearerToken}, {method: 'update'});

    res.json(bearerToken);
};

export const logout = async (req: any, res: express.Response) => {
    const user = req.user;
    if(!user){
        res.json('User not found!');
        return;
    }

    await new User().where({id: user.id}).save({bearerToken: null}, {method: 'update'});

    res.json('Logged out successfully!');
};

export const confirmAccount = async (req:express.Request, res: express.Response) => {
    const confirmationToken = req.body.token;

    await knex.transaction(async trx => {
        const user = await new User({confirmationToken}).fetch({require: false, transacting: trx});
        if(!user){
            res.json('Error: Account does not exist.');
            return;
        }
        await user.save({isConfirmed: true}, {transacting: trx, method: 'update'});
        await user.save({confirmationToken: null}, {transacting: trx, method: 'update'});
    });

    res.json('Account confirmed');
};

export const sendPasswordResetRequest = async (req:express.Request, res: express.Response) => {
    const resetPasswordToken = crypto.randomBytes(20).toString('hex');
    if(!await new User().where({email: req.body.email}).save({resetPasswordToken}, {method: 'update'})){
        res.json('Error: Account does not exist.');
        return;
    }

    await transporter.sendMail({
        from: "'Api', <mail@api.com>",
        to: req.body.email,
        subject: 'Password reset',
        text: `To change your password please access http://${process.env.API_URL}:${process.env.SERVER_PORT}/auth/changePassword \nPassword reset token: ${resetPasswordToken}`
    });

    res.json('Password reset request sent. Please check your email.');
};

export const resetPassword = async (req:express.Request, res: express.Response) => {
    const {resetPasswordToken, password, confirmPassword} = req.body;

    if(!resetPasswordToken){
        res.json('Error: No password reset token received.');
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

    await new User().where({resetPasswordToken}).save({password, resetPasswordToken: null}, {method: 'update'});
    
    res.json('Password successfully changed!');
};

export const resendConfirmationEmail = async (req:express.Request, res: express.Response) => {
    if(!req.body.email){
        res.status(400).json('Bad request.');
        return;
    }

    const user = await new User({email: req.body.email}).fetch({require: false});

    if(!user){
        res.json('The user does not exist.');
        return;
    }

    const confirmationToken = user.get('confirmationToken');

    if(!confirmationToken){
        res.json('This account has already been confirmed.');
        return;
    }

    await transporter.sendMail({
        from: "'Api', <mail@api.com>",
        to: req.body.email,
        subject: 'Confirm your account',
        text: `Please confirm your new account. Confirmation token: ${confirmationToken}`
    });

    res.json('Confirmation email sent.');
};

export const googleCallback = async (req:express.Request, res: express.Response) => {
    const {tokens} = await oauth2Client.getToken(req.query.code);
    
    oauth2Client.setCredentials(tokens);
    const userInfo = await google.oauth2('v2').userinfo.get({auth: oauth2Client});

    const email = userInfo.data.email;
    const user = await new User({ email }).fetch({require: false});
    
    if(!user){
        await new User().save({
            email,
            name: userInfo.data.name,
            isConfirmed: userInfo.data.verified_email,
            bearerToken: tokens.access_token,
            refreshToken: tokens.refresh_token
        }, {method: 'insert'});
        res.json(tokens.access_token);
    }else{
        await new User().where({email}).save({
            bearerToken: tokens.access_token,
            refreshToken: tokens.refresh_token
        }, {method: 'update'});
        res.json(tokens.access_token);
    }
};

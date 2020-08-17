import express from 'express';
import passport from 'passport';
const BearerStrategy = require('passport-http-bearer');
import { User } from '../entities/users';
import oauth2Client from './oauth2ClientConfig';

export const configurePassport = () => passport.use(new BearerStrategy(
    async (token: any, done: any) => {
      const user = await new User({bearerToken: token}).fetch({require: false});
        if (!user){ 
            return done(null, false); 
        }
        return done(null, user, { scope: 'all' });
    }
));

export const googleAuth = async (req: express.Request, res: express.Response) => {
    const url = await oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['profile', 'email'] 
    });

    res.redirect(url);
};

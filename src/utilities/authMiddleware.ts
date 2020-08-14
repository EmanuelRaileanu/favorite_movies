import passport from 'passport';
const BearerStrategy = require('passport-http-bearer');
import { User } from '../entities/users';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

export const configurePassport = () => passport.use(new BearerStrategy(
    async (token: any, done: any) => {
      const user = await new User({bearerToken: token}).fetch({require: false});
        if (!user){ 
            return done(null, false); 
        }
        return done(null, user, { scope: 'all' });
    }
));

export const configureGoogleAuth = (clientID: string | undefined, clientSecret: string | undefined, callbackURL: string | undefined) => passport.use(
    new GoogleStrategy({
        clientID,
        clientSecret,
        callbackURL
    }, async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
        let user = await new User({name: profile.displayName}).fetch({require: false});
        console.log(profile)
        if(!user){
            user = await new User().save({
                name: profile.displayName,
                accessToken,
                refreshToken
            }, {method: 'insert'});
        }
        else if(user && user.get('accessToken') != accessToken){
            user = user.save({accessToken}, {method: 'update'});
        }
        return cb(null, user, { scope: 'all' });
    })
);

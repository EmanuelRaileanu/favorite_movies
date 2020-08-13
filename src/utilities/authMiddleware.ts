import passport from 'passport';
const BearerStrategy = require('passport-http-bearer');
import { User } from '../entities/users';

const configurePassport = () => passport.use(new BearerStrategy(
    async (token: any, done: any) => {
      const user = await new User({bearerToken: token}).fetch({require: false});
        if (!user){ 
            return done(null, false); 
        }
        return done(null, user, { scope: 'all' });
    }
));

export default configurePassport;
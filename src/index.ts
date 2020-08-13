import dotenv from 'dotenv';
import express, { Router } from 'express';
import * as root from './routes/root';
import * as movies from './routes/movies';
import * as err from './routes/err';
import * as productionCompanies from './routes/productionCompanies';
import * as actors from './routes/actors';
import * as register from './routes/register';
import * as login from './routes/login';
import passport from 'passport';
import { User } from './entities/users';
const BearerStrategy = require('passport-http-bearer');

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

passport.use(new BearerStrategy(
    async (token: any, done: any) => {
      const user = await new User({bearerToken: token}).fetch({require: false});
        if (!user){ 
            return done(null, false); 
        }
        return done(null, user, { scope: 'all' });
    }
));

app.use(express.json());
app.use('/public', express.static('public'));

const apiRouter = express.Router();
app.use('/api', passport.authenticate('bearer', { session: false }), apiRouter);
root.register(apiRouter);
movies.register(apiRouter);
productionCompanies.register(apiRouter);
actors.register(apiRouter);

const loginRouter = express.Router();
app.use('/auth', loginRouter);
register.register(loginRouter);
login.register(loginRouter);

err.register(app);

app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});
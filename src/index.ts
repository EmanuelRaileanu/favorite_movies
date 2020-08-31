import dotenv from 'dotenv';
import express, { Router } from 'express';
import * as root from './routes/root';
import * as movies from './routes/movies';
import * as err from './routes/err';
import * as productionCompanies from './routes/productionCompanies';
import * as actors from './routes/actors';
import * as profile from './routes/profile';
import * as auth from './routes/auth';
import passport from 'passport';
import * as authentication from './utilities/authMiddleware';
import fs from 'fs';
import util from 'util';

const deleteFile = util.promisify(fs.unlink);

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(passport.initialize());
app.use('/public', express.static('public'));

authentication.configurePassport();

const apiRouter = express.Router();
app.use('/api', passport.authenticate('bearer', { session: false }) || passport.authenticate('google', { session: false }), apiRouter);
root.register(apiRouter);
movies.register(apiRouter);
productionCompanies.register(apiRouter);
actors.register(apiRouter);
profile.register(apiRouter);

const loginRouter = express.Router();
app.use('/auth', loginRouter);
auth.register(loginRouter);

err.register(app);

app.use(async (err: any, req: any, res: any, next: any) => {
    if(req.file){
        await deleteFile(req.file.path);
    }
    res.json(err.toString()); 
});

app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});
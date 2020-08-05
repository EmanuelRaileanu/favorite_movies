import dotenv from 'dotenv';
import express from 'express';
import * as root from './routes/root';
import * as movies from './routes/movies';
import * as err from './routes/err';
import * as productionCompanies from './routes/productionCompanies';
import * as bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));

root.register(app);

movies.register(app);

productionCompanies.register(app);

err.register(app);

app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});
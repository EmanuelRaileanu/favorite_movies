import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import movie_list from './movies.json';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    const response = {
        name: "Favorite Movies",
        version: process.env.npm_package_version
    };
    res.send(response);
});

app.get('/movies', (req, res) => {
    res.send(movie_list.movies);
});

app.post('/movies', (req, res) => {
    const movie = {
        id: movie_list.movies.length + 1,
        name: req.body.name
    };
    movie_list.movies.push(movie);
    res.send('POST request received');
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started on port ${port}...`);
});
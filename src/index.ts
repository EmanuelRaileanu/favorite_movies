import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import Knex from 'knex';

const knex = Knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'dev',
        password: '',
        database: 'mydb'
    }
});

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
    knex.from('movies').select("*")
    .then((rows: object[]) => {
            res.send(rows);
    }).catch((err) => { console.log( err); throw err });
});

app.post('/movies', (req, res) => {
    if(!req.body.name){
        res.status(400).send('Bad request');
        return;
    }

    const movies = {
        name: req.body.name
    };
    console.log(movies);
    knex('movies').insert(movies)
    .then(() => console.log("data inserted"))
    .catch((err) => { console.log(err); throw err });
    res.send('POST request received');
});

/*app.delete('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id, 10));
    if(!movie){ res.status(404).send('Movie not found'); return; }
    else movies.splice(parseInt(req.params.id, 10) - 1, 1);
    for(let i = parseInt(req.params.id, 10) - 1; i < movies.length; i++)
        movies[i].id--;
    res.send('DELETE request received');
});*/

app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});
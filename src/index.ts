import dotenv from 'dotenv';
import path from 'path';
import express from 'express';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('index');
});

app.get('/movies', (req, res) => {
    res.render('movies');
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started on port ${port}...`);
});
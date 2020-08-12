import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export async function searchMovieByTitle(title: string){
    let res;
    res = (await fetch(`${process.env.OMDB_API_URL}?t=${title}&apikey=${process.env.OMDB_API_KEY}`));
    if(res.status !== 200){
        return 'Error: Cannot access remote database.';
    }
    return res.json();
}

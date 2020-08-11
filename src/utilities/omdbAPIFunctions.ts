import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export async function searchMovieByTitle(title: string){
    return (await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}`)).json();
}

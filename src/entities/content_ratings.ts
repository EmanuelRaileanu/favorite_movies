import { bookshelf } from '../utilities/knexconfig';
import { Movie } from './movies';
import { BaseModel } from './base_model';

export class ContentRating extends BaseModel{
    get tableName(){
        return 'content_ratings';
    }

    // one-to-many relationship with Movie
    movies(){
        return this.hasMany(Movie, 'contentRatingId', 'id');
    }
}
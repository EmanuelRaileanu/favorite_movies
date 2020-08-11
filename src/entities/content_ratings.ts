import { bookshelf } from '../utilities/knexconfig';
import { Movie } from './movies';

export class ContentRating extends bookshelf.Model<ContentRating>{
    get tableName(){
        return 'content_ratings';
    }

    // one-to-many relationship with Movie
    movies(){
        return this.hasMany(Movie, 'contentRatingId', 'id');
    }
}
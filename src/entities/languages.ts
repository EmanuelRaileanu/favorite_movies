import { bookshelf } from '../utilities/knexconfig';
import { Movie } from './movies';
import { BaseModel } from './base_model';

export class Language extends BaseModel{
    get tableName(){
        return 'languages';
    }

    // many-to-many relationship with Movie
    movies(){
        return this.belongsToMany(Movie, 'movies_languages', 'languageId', 'movieId');
    }
}
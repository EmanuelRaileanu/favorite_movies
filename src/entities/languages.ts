import { bookshelf } from '../utilities/knexconfig';
import { Movie } from './movies';

export class Language extends bookshelf.Model<Language>{
    get tableName(){
        return 'languages';
    }

    // many-to-many relationship with Movie
    movies(){
        return this.belongsToMany(Movie, 'movies_languages', 'languageId', 'movieId');
    }
}
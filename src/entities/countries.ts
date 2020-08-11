import { bookshelf } from '../utilities/knexconfig';
import { Location } from './locations';
import { Movie } from './movies';

export class Country extends bookshelf.Model<Country>{
    get tableName(){
        return 'countries';
    }

    // one-to-many relationship with Location
    location(){
        return this.hasMany(Location, 'movieId', 'id');
    }

    // one-to-many relationship with Movie
    movies(){
        return this.hasMany(Movie, 'countryId', 'id');
    }
}
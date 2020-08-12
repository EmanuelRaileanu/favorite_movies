import { bookshelf } from '../utilities/knexconfig';
import { Location } from './locations';
import { Movie } from './movies';
import { BaseModel } from './base_model';

export class Country extends BaseModel{
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
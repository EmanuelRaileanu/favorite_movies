import { bookshelf } from '../utilities/knexconfig';
import { Location } from './locations';

export class Country extends bookshelf.Model<Country>{
    get tableName(){
        return 'countries';
    }

    // one-to-many relationship with Location
    location(){
        return this.hasMany(Location, 'movieId', 'id');
    }
}
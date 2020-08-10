import { bookshelf } from '../utilities/knexconfig';
import { Country } from './countries';
import { Street } from './streets';

export class Location extends bookshelf.Model<Location>{
    get tableName(){
        return 'locations';
    }

    // one-to-many relationship with Country
    country(){
        return this.belongsTo(Country, 'countryId', 'id');
    }

    // one-to-many relationship with Street
    street(){
        return this.hasMany(Street, 'locationId', 'id');
    }
}
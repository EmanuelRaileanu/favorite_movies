import { bookshelf } from '../utilities/knexconfig';
import { Country } from './countries';
import { Street } from './streets';
import { BaseModel } from './base_model';

export class Location extends BaseModel{
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
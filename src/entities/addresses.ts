import { bookshelf } from '../utilities/knexconfig';
import { Street } from './streets';
import { MovieSet } from './movie_sets';
import { ProductionCrew } from './production_crew';
import { BaseModel } from './base_model';

export class Address extends BaseModel{
    get tableName(){
        return 'addresses';
    }

    // one-to-many relationship with Street
    street(){
        return this.belongsTo(Street, 'streetId', 'id');
    }

    // one-to-many relatinoship with MovieSet
    movieSet(){
        return this.hasMany(MovieSet, 'addressId', 'id');
    }

    // one-to-many relationship with ProductionCrew
    productionCrew(){
        return this.hasMany(ProductionCrew, 'addressId', 'id');
    }
}
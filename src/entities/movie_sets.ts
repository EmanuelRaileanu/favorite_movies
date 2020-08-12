import { bookshelf } from '../utilities/knexconfig';
import { Address } from './addresses';
import { MovieScene } from './movie_scenes';
import { BaseModel } from './base_model';

export class MovieSet extends BaseModel{
    get tableName(){
        return 'movie_sets';
    }

    // one-to-many relationship with Address
    address(){
        return this.belongsTo(Address, 'addressId', 'id');
    }

    // one-to-many relationship with MovieScene
    movieScene(){
        return this.hasMany(MovieScene, 'setId', 'id');
    }
}
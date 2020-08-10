import { bookshelf } from '../utilities/knexconfig';
import { Location } from './locations';
import { Address } from './addresses';

export class Street extends bookshelf.Model<Street>{
    get tableName(){
        return 'streets';
    }

    // one-to-many relationship with Location
    location(){
        return this.belongsTo(Location, 'locationId', 'id');
    }

    // one-to-many relationship with Address
    address(){
        return this.hasMany(Address, 'streetId', 'id');
    }
}
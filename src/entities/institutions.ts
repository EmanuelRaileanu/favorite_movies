import { bookshelf } from '../utilities/knexconfig';
import { Studies } from './studies';

export class Institution extends bookshelf.Model<Institution>{
    get tableName(){
        return 'institutions';
    }

    // one-to-many relationship with Studies
    studies(){
        return this.hasMany(Studies, 'institutionId', 'id');
    }
}
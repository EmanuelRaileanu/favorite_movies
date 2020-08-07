import { bookshelf } from '../utilities/knexconfig';
import { Studies } from './studies';

export class Degree extends bookshelf.Model<Degree>{
    get tableName(){
        return 'degrees';
    }

    // one-to-many relationship with Studies
    studies(){
        return this.hasMany(Studies, 'degreeId', 'id');
    }
}
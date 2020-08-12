import { bookshelf } from '../utilities/knexconfig';
import { Studies } from './studies';
import { BaseModel } from './base_model';

export class Degree extends BaseModel{
    get tableName(){
        return 'degrees';
    }

    // one-to-many relationship with Studies
    studies(){
        return this.hasMany(Studies, 'degreeId', 'id');
    }
}
import { bookshelf } from '../utilities/knexconfig';
import { Studies } from './studies';
import { BaseModel } from './base_model';

export class Institution extends BaseModel{
    get tableName(){
        return 'institutions';
    }

    // one-to-many relationship with Studies
    studies(){
        return this.hasMany(Studies, 'institutionId', 'id');
    }
}
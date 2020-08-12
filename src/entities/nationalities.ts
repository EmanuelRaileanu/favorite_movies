import { bookshelf } from '../utilities/knexconfig';
import { Actor } from './actors';
import { BaseModel } from './base_model';

export class Nationality extends BaseModel{
    get tableName(){
        return 'nationalities';
    }

    // one-to-many relationship with Actor
    actor(){
        return this.hasMany(Actor, 'actorId', 'id');
    }
}
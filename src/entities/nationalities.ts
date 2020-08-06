import { bookshelf } from '../utilities/knexconfig';
import { Actor } from './actors';

export class Nationality extends bookshelf.Model<Nationality>{
    get tableName(){
        return 'nationalities';
    }

    // one-to-many relationship with Actor
    actor(){
        return this.hasMany(Actor, 'actorId', 'id');
    }
}
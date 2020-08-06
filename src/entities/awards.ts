import { bookshelf } from '../utilities/knexconfig';
import { Actor } from './actors';

export class Award extends bookshelf.Model<Award>{
    get tableName(){
        return 'awards';
    }

    // one-to-many relationship with Actor
    actor(){
        return this.belongsTo(Actor, 'actorId', 'id');
    }
}
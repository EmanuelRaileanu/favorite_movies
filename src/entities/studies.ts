import { bookshelf } from '../utilities/knexconfig';
import { Actor } from './actors';

export class Studies extends bookshelf.Model<Studies>{
    get tableName(){
        return 'studies';
    }

    // one-to-many relationship with Actor
    actor(){
        return this.belongsTo(Actor, 'actorId', 'id');
    }
}
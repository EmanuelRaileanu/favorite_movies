import { bookshelf } from '../utilities/knexconfig';
import { Actor } from './actors';
import { Institution } from './institutions';
import { Degree } from './degrees';

export class Studies extends bookshelf.Model<Studies>{
    get tableName(){
        return 'studies';
    }

    // one-to-many relationship with Actor
    actor(){
        return this.belongsTo(Actor, 'actorId', 'id');
    }

    // one-to-many relationship with Institution
    institution(){
        return this.belongsTo(Institution, 'institutionId', 'id');
    }

    // one-to-many relationship with Degree
    degree(){
        return this.belongsTo(Degree, 'degreeId', 'id');
    }
}
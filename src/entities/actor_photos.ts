import { bookshelf } from '../utilities/knexconfig';
import { Actor } from './actors';

export class ActorPhoto extends bookshelf.Model<ActorPhoto>{
    get tableName(){
        return 'actor_photos';
    }

    // one-to-one relationship with Actor
    actor(){
        return this.belongsTo(Actor, 'id', 'recentPhotoId');
    }
}
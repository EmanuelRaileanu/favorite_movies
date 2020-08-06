import { bookshelf } from '../utilities/knexconfig';
import { Actor } from './actors';
import { absoluteUrl } from '../utilities/absoluteUrl';

export class ActorPhoto extends bookshelf.Model<ActorPhoto>{
    get tableName(){
        return 'actor_photos';
    }

    // one-to-one relationship with Actor
    actor(){
        return this.belongsTo(Actor, 'id', 'recentPhotoId');
    }

    virtuals: any = {
        absoluteUrl(){
            return absoluteUrl + this.get('relativePath');
        }
    }
}
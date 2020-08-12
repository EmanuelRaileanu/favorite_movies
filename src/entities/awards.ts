import { bookshelf } from '../utilities/knexconfig';
import { Actor } from './actors';
import { AwardName } from './award_list';
import { BaseModel } from './base_model';

export class Award extends BaseModel{
    get tableName(){
        return 'awards';
    }

    // one-to-many relationship with Actor
    actor(){
        return this.belongsTo(Actor, 'actorId', 'id');
    }

    // one-to-many relationship with AwardName
    award(){
        return this.belongsTo(AwardName, 'awardId', 'id');
    }
}
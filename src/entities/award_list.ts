import { bookshelf } from '../utilities/knexconfig';
import { Award } from './awards';
import { BaseModel } from './base_model';

export class AwardName extends BaseModel{
    get tableName(){
        return 'award_list';
    }

    // one-to-many relationship with Award
    awards(){
        return this.hasMany(Award, 'awardId', 'id');
    }
}
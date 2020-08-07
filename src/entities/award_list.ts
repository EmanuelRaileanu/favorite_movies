import { bookshelf } from '../utilities/knexconfig';
import { Award } from './awards';

export class AwardName extends bookshelf.Model<AwardName>{
    get tableName(){
        return 'award_list';
    }

    // one-to-many relationship with Award
    awards(){
        return this.hasMany(Award, 'awardId', 'id');
    }
}
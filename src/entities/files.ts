import { bookshelf } from '../utilities/knexconfig';
import { Movie } from './movies';
import { absoluteUrl } from '../utilities/absoluteUrl';
import { Actor } from './actors';
import { BaseModel } from './base_model';

export class File extends BaseModel{
    get tableName(){
        return 'files';
    }

    // one-to-one relationship with Movie
    movie(){
        return this.belongsTo(Movie, 'id', 'posterId');
    }

    // one-to-one relationship with Actor
    actor(){
        return this.belongsTo(Actor, 'id', 'recentPhotoId');
    }

    virtuals: any = {
        url(){
            return absoluteUrl + this.get('relativePath');
        }
    }
}
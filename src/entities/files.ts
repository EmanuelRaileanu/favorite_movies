import { bookshelf } from '../utilities/knexconfig';
import { Movie } from './movies';
import { absoluteUrl } from '../utilities/absoluteUrl';
import { Actor } from './actors';

export class File extends bookshelf.Model<File>{
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
import { bookshelf } from '../utilities/knexconfig';
import { Movie } from './movies';
import { absoluteUrl } from '../utilities/absoluteUrl';

export class File extends bookshelf.Model<File>{
    get tableName(){
        return 'files';
    }

    // one-to-one relationship with Movie
    movie(){
        return this.belongsTo(Movie, 'id', 'posterId');
    }

    virtuals: any = {
        absoluteUrl(){
            return absoluteUrl + this.get('relativePath');
        }
    }
}
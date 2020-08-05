import { bookshelf } from '../utilities/knexconfig';
import { Movie } from './movies';
import { absoluteUrl } from '../utilities/absoluteUrl';

bookshelf.plugin('bookshelf-virtuals-plugin');

export class File extends bookshelf.Model<File>{
    get tableName(){
        return 'files';
    }

    movie(){
        return this.belongsTo(Movie, 'id', 'posterId');
    }

    virtuals: any = {
        absoluteUrl(){
            return absoluteUrl + this.get('relativePath');
        }
    }
}
import { bookshelf } from '../utilities/knexconfig';
import { Movie } from './movies';

export class File extends bookshelf.Model<File>{
    get tableName(){
        return 'files';
    }

    movie(){
        return this.belongsTo(Movie, 'id', 'posterId');
    }
}
import { bookshelf } from '../utilities/knexconfig';
import { File } from './files';
import { Movie } from './movies';

export class Actor extends bookshelf.Model<Actor>{
    get tableName(){
        return 'actors';
    }

    // one-to-one relationship with ActorPhoto
    actorPhoto(){
        return this.hasOne(File, 'id', 'recentPhotoId');
    }

    // many-to-many relationship with Movie
    movies(){
        return this.belongsToMany(Movie, 'movies_actors', 'actorId', 'movieId');
    }
}
import { bookshelf } from '../utilities/knexconfig';
import { ActorPhoto } from './actor_photos';
import { Movie } from './movies';

export class Actor extends bookshelf.Model<Actor>{
    get tableName(){
        return 'actors';
    }

    // one-to-one relationship with ActorPhoto
    actorPhoto(){
        return this.hasOne(ActorPhoto, 'id', 'recentPhotoId');
    }

    // many-to-many relationship with Movie
    actor(){
        return this.belongsToMany(Movie, 'movies_actors', 'actorId', 'movieId');
    }
}
import { bookshelf } from '../utilities/knexconfig';
import { File } from './files';
import { Movie } from './movies';
import { Studies } from './studies';
import { Award } from './awards';
import { Nationality } from './nationalities';
import { MovieScene } from './movie_scenes';
import { BaseModel } from './base_model';

export class Actor extends BaseModel{
    [x: string]: any;
    get tableName(){
        return 'actors';
    }

    get length(){
        return this.count();
    }

    // one-to-one relationship with File
    actorPhoto(){
        return this.hasOne(File, 'id', 'recentPhotoId');
    }

    // many-to-many relationship with Movie
    movies(){
        return this.belongsToMany(Movie, 'movies_actors', 'actorId', 'movieId');
    }

    // one-to-many relationship with Studies
    studies(){
        return this.hasMany(Studies, 'actorId', 'id');
    }

    // one-to-many relationship with Award
    awards(){
        return this.hasMany(Award, 'actorId', 'id');
    }

    // one-to-many relationship with Nationality
    nationality(){
        return this.belongsTo(Nationality, 'actorId', 'id');
    }

    // many-to-many relationship wtih MovieScene
    movieScenes(){
        return this.belongsToMany(MovieScene, 'actors_movie_scenes', 'actorId', 'sceneId');
    }
}
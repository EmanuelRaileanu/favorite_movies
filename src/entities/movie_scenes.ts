import { bookshelf } from '../utilities/knexconfig';
import { MovieSet } from './movie_sets';
import { Movie } from './movies';
import { ProductionCrew } from './production_crew';
import { Actor } from './actors';
import { BaseModel } from './base_model';

export class MovieScene extends BaseModel{
    get tableName(){
        return 'movie_scenes';
    }

    // one-to-many relationship with MovieSet
    movieSet(){
        return this.belongsTo(MovieSet, 'setId', 'id');
    }

    // one-to-many relationship with Movie
    movie(){
        return this.belongsTo(Movie, 'movieId', 'id');
    }

    // many-to-many relationship with ProductionCrew
    productionCrew(){
        return this.belongsToMany(ProductionCrew, 'production_crew_movie_scenes', 'movieSceneId', 'productionCrewMemberId');
    }

    // many-to-many relationship with Actor
    actors(){
        return this.belongsToMany(Actor, 'actors_movie_scenes', 'sceneId', 'actorId');
    }
}
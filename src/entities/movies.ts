import { ProductionCompany } from './production_companies';
import { MovieCategory } from './movie_categories';
import { File } from './files';
import { Actor } from './actors';
import { MovieScene } from './movie_scenes';
import { ProductionCrew } from './production_crew';
import { ContentRating } from './content_ratings';
import { Country } from './countries';
import { Language } from './languages';
import { BaseModel } from './base_model';

export class Movie extends BaseModel{
    [x: string]: any;
    get tableName(){
        return 'movies';
    }

    get length(){
        return this.count();
    }

    // many-to-many relationship with MovieCategory
    categories(){
        return this.belongsToMany(MovieCategory, 'movies_movie_categories', 'movieId', 'categoryId');
    }

    // one-to-many relationshop with ProductionCompany
    productionCompany(){
        return this.belongsTo(ProductionCompany,'ProductionCompanyId','id');
    }

    // one-to-one relationship with File
    poster(){
        return this.hasOne(File, 'id', 'posterId');
    }

    // many-to-many relationship with Actor
    actors(){
        return this.belongsToMany(Actor, 'movies_actors', 'movieId', 'actorId');
    }

    // one-to-many relationship with MovieScene
    movieScenes(){
        return this.hasMany(MovieScene, 'movieId', 'id');
    }

    // many-to-many relationship with ProductionCrew
    productionCrew(){
        return this.belongsToMany(ProductionCrew, 'production_crew_movies', 'movieId', 'productionCrewMemberId');
    }

    // one-to-many relationship with ContentRating
    rated(){
        return this.belongsTo(ContentRating, 'contentRatingId', 'id');
    }

    // one-to-many relationship with Country
    country(){
        return this.belongsTo(Country, 'countryId', 'id');
    }

    // many-to-many relationship with Language
    languages(){
        return this.belongsToMany(Language, 'movies_languages', 'movieId', 'languageId');
    }
}

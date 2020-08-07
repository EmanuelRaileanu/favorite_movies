import { bookshelf } from '../utilities/knexconfig';
import { ProductionCompany } from './production_companies';
import { MovieCategory } from './movie_categories';
import { File } from './files';
import { Actor } from './actors';

export class Movie extends bookshelf.Model<Movie>{

    get tableName(){
        return 'movies';
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

}

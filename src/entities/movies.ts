import { bookshelf } from '../utilities/knexconfig';
import { ProductionCompany } from './production_companies';
import { MovieCategory } from './movie_categories';
import { File } from './files';

export class Movie extends bookshelf.Model<Movie>{
    get tableName(){
        return 'movies';
    }

    categories(){
        return this.belongsToMany(MovieCategory, 'movies_movie_categories', 'movieId', 'categoryId');
    }

    productionCompany(){
        return this.belongsTo(ProductionCompany,'ProductionCompanyId','id');
    }

    poster(){
        return this.hasOne(File, 'id', 'posterId');
    }
}

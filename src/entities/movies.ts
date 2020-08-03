import { bookshelf } from '../utilities/knexconfig';
import { ProductionCompanies } from './production_companies';
import { MovieCategories } from './movie_categories';
import { MoviesMovieCategories } from './movies_movie_categories';

export class Movies extends bookshelf.Model<Movies>{
    get tableName(){
        return 'movies';
    }

    get length(){
        return this.count();
    }

    movieCategories(){
        return this.belongsToMany(MovieCategories, 'id', 'id');
    }

    productionCompanies(){
        return this.belongsTo(ProductionCompanies,'ProductionCompanyId','id');
    }

    static get movieCategories(){
        return this.forge<MovieCategories>().belongsToMany(MovieCategories,'id', 'id');
    }
}

import { bookshelf } from '../utilities/knexconfig';
import { ProductionCompanies } from './production_companies';
import { MovieCategory } from './movie_categories';

export class Movie extends bookshelf.Model<Movie>{
    get tableName(){
        return 'movies';
    }

    get length(){
        return this.count();
    }

    categories(){
        return this.belongsToMany(MovieCategory, 'movies_movie_categories', 'movieId', 'categoryId');
    }

    productionCompanies(){
        return this.belongsTo(ProductionCompanies,'ProductionCompanyId','id');
    }
}

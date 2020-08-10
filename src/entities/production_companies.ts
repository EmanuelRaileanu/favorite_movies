import { bookshelf } from '../utilities/knexconfig';
import { Movie } from './movies';
import { ProductionCrew } from './production_crew';

export class ProductionCompany extends bookshelf.Model<ProductionCompany>{

    get tableName(){
        return 'production_companies';
    }

    // one-to-many relationship with Movie
    movies(){
        return this.hasMany(Movie, 'ProductionCompanyId', 'id');
    }

    // one-to-many relationship with ProductionCrew
    productionCrew(){
        return this.hasMany(ProductionCrew, 'productionCompanyId', 'id');
    }
}
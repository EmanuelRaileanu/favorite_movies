import { bookshelf } from '../utilities/knexconfig';
import { Movie } from './movies';

export class ProductionCompany extends bookshelf.Model<ProductionCompany>{

    get tableName(){
        return 'production_companies';
    }

    // one-to-many relationshop with Movie
    movies(){
        return this.hasMany(Movie, 'ProductionCompanyId', 'id');
    }

}
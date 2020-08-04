import { bookshelf } from '../utilities/knexconfig';
import { Movie } from './movies';

export class ProductionCompanies extends bookshelf.Model<ProductionCompanies>{

    get tableName(){
        return 'production_companies';
    }

    movies(){
        return this.hasMany(Movie, 'ProductionCompanyId', 'id');
    }

    static async getProductionCompanyById(id: number){
        const query = await this.forge<ProductionCompanies>({id}).fetch({
            require: false,
            withRelated: ['movies']
        });
        query.attributes.totalMoviesMade = await query.related('movies').count();
        return query.attributes;
    }
}
import { bookshelf } from '../utilities/knexconfig';
import { Movies } from './movies';

export class ProductionCompanies extends bookshelf.Model<ProductionCompanies>{

    get tableName(){
        return 'production_companies';
    }

    get length(){
        return this.count();
    }

    movies(){
        return this.hasMany(Movies, 'movies.productionCompanyId', 'production_companies.id')
    }

    static async getProductionCompanyById(id: number){
        return (await this.where<ProductionCompanies>({id}).fetch());
    }
}
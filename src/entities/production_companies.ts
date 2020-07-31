import { bookshelf } from '../utilities/knexconfig';
import { Movies } from './movies';

export class ProductionCompanies extends bookshelf.Model<ProductionCompanies>{

    get tableName(){
        return 'production_companies';
    }

    get length(){
        return this.count();
    }

    static get movies(){
        return this.forge<Movies>().hasMany(Movies, 'productionCompanyId', 'id')
    }

    static async getProductionCompanyNameById(id: number){
        return (await this.where<ProductionCompanies>({id}).fetch()).get('name');
    }
}
import { bookshelf } from '../utilities/knexconfig';

export class ProductionCompanies extends bookshelf.Model<ProductionCompanies>{
    get tableName(){
        return 'production_companies';
    }

    get length(){
        return this.count();
    }

    async getProductionCompanyNameById(id: number){
        return (await this.where({id}).fetch()).get('name');
    }
}
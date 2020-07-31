import { bookshelf } from '../utilities/knexconfig';
import { ProductionCompanies } from './production_companies';

export class Movies extends bookshelf.Model<Movies>{
    static query: any;
    get tableName(){
        return 'movies';
    }

    get length(){
        return this.count();
    }

    static get productionCompanies(){
        return this.forge<Movies>().belongsTo(ProductionCompanies,'id','productionCompanyId');
    }

    static async getMovies(page: number, pageSize: number){
        return (await this.query({}).fetchPage({page, pageSize})).map((q: any) => q.attributes);
    }

    static async getMovieById(id: number){
        return await (await this.forge<Movies>({id}).fetch({require:false})).attributes;
    }
}

import { bookshelf } from '../utilities/knexconfig';
import { ProductionCompanies } from './production_companies';
import { MovieCategories } from './movie_categories';

export class Movies extends bookshelf.Model<Movies>{
    static query: any;
    get tableName(){
        return 'movies';
    }

    get length(){
        return this.count();
    }

    get productionCompanies(){
        return this.belongsTo(ProductionCompanies,'production_companies.id','movies.productionCompanyId');
    }

    static get movieCategories(){
        return this.forge<MovieCategories>().belongsToMany(MovieCategories,'id', 'id');
    }

    static async getMovies(page: number, pageSize: number){
        return (await this.query({}).fetchPage({page, pageSize})).map((q: any) => q.attributes);
    }

    static async getMovieById(id: number){
        return await (await this.forge<Movies>({id}).fetch({require:false})).attributes;
    }
}

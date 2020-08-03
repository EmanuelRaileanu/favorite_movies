import { bookshelf } from '../utilities/knexconfig';
import { Movies } from '../entities/movies';

export class MovieCategories extends bookshelf.Model<MovieCategories>{
    get tableName(){
        return 'movie_categories';
    }

    static get movies(){
        return this.forge<Movies>().belongsToMany(Movies, 'id', 'id');
    }

    static async getCategoryNameById(id: number){
        return (await this.where<MovieCategories>({id}).fetch()).get('category');
    }
}
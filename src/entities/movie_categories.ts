import { bookshelf } from '../utilities/knexconfig';
import { Movies } from '../entities/movies';
import { MoviesMovieCategories } from './movies_movie_categories';

export class MovieCategories extends bookshelf.Model<MovieCategories>{
    get tableName(){
        return 'movie_categories';
    }

    movies(){
        return this.belongsToMany(MoviesMovieCategories, 'categoryId', 'id');
    }

    static async getCategoryNameById(id: number){
        return (await this.where<MovieCategories>({id}).fetch()).get('category');
    }
}
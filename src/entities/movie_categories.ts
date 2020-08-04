import { bookshelf } from '../utilities/knexconfig';
import { Movie } from '../entities/movies';

export class MovieCategory extends bookshelf.Model<MovieCategory>{
    get tableName(){
        return 'movie_categories';
    }

    movies(){
        return this.belongsToMany(Movie, 'movies_movie_categories', 'categoryId', 'movieId');
    }

    static async getCategoryNameById(id: number){
        return (await this.where<MovieCategory>({id}).fetch()).get('category');
    }
}
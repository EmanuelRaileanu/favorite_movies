import { bookshelf } from '../utilities/knexconfig';
import { Movie } from '../entities/movies';
import { BaseModel } from './base_model';

export class MovieCategory extends BaseModel{
    get tableName(){
        return 'movie_categories';
    }

    // many-to-many relationship with Movie
    movies(){
        return this.belongsToMany(Movie, 'movies_movie_categories', 'categoryId', 'movieId');
    }

    static async getCategoryNameById(id: number){
        return (await this.where<MovieCategory>({id}).fetch()).get('category');
    }
}
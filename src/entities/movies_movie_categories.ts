import { bookshelf } from '../utilities/knexconfig';

export class MoviesMovieCategories extends bookshelf.Model<MoviesMovieCategories>{
    get tableName(){
        return 'movies_movie_categories';
    }

    async getCategoryId(id: number){
        return ((await this.fetchAll()).filter((category: any) => category.attributes.movieId === id)).map(obj => obj.attributes);
    }
}
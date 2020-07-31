import { bookshelf } from '../utilities/knexconfig';

export class MovieCategories extends bookshelf.Model<MovieCategories>{
    get tableName(){
        return 'movie_categories';
    }

    static async getCategoryNameById(id: number){
        return (await this.where<MovieCategories>({id}).fetch()).get('category');
    }
}
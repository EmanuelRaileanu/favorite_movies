import { bookshelf } from '../utilities/knexconfig';

export class MovieCategories extends bookshelf.Model<MovieCategories>{
    get tableName(){
        return 'movie_categories';
    }

    async getCategoryNameById(id: number){
        return (await this.where({id}).fetch()).get('category');
    }
}
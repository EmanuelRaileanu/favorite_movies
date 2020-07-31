import { bookshelf } from '../utilities/knexconfig';

export class Movies extends bookshelf.Model<Movies>{
    get tableName(){
        return 'movies';
    }

    get length(){
        return this.count();
    }

    async getMovieById(id: number){
        return (await this.where({id}).fetch()).attributes;
    }
}


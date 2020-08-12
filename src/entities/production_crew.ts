import { bookshelf } from '../utilities/knexconfig';
import { ProductionCrewType } from './production_crew_types';
import { Address } from './addresses';
import { ProductionCompany } from './production_companies';
import { Movie } from './movies';
import { MovieScene } from './movie_scenes';

export class ProductionCrew extends bookshelf.Model<ProductionCrew>{
    get tableName(){
        return 'production_crew';
    }

    // many-to-many relationship with ProductionCrewType
    productionCrewType(){
        return this.belongsToMany(ProductionCrewType, 'production_crew_associated_types', 'ProductionCrewMemberId', 'typeId');
    }

    // one-to-many relationship with ProductionCompany
    productionCompany(){
        return this.belongsTo(ProductionCompany, 'productionCompanyId', 'id');
    }

    // one-to-many relationship with Address
    address(){
        return this.belongsTo(Address, 'addressId', 'id');
    }

    // many-to-many relationship with Movie
    movies(){
        return this.belongsToMany(Movie, 'production_crew_movies', 'productionCrewMemberId', 'movieId');
    }

    // many-to-many relationship with MovieScene
    movieScenes(){
        return this.belongsToMany(MovieScene, 'production_crew_movie_scenes', 'productionCrewMemberId', 'movieSceneId');
    }
}
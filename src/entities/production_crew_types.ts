import { bookshelf } from '../utilities/knexconfig';
import { ProductionCrew } from './production_crew';

export class ProductionCrewType extends bookshelf.Model<ProductionCrewType>{
    get tableName(){
        return 'production_crew_types';
    }

    // many-to-many relationship with ProductionCrew
    productionCrew(){
        return this.belongsToMany(ProductionCrew, 'production_crew_associated_types','typeId', 'productionCrewMemberId');
    }
}
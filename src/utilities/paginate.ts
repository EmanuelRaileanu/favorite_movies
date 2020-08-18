import { knex } from './knexconfig';
import { Movie } from '../entities/movies';

export const getLength = async (table: string) => parseInt(String((await knex(table).count('id'))[0]['count(`id`)']), 10);

export const paginate = async (page: number, pageSize: number, length: number) => {
    const pageCount = Math.ceil(length / pageSize);

    const rows = (await new Movie().fetchPage({
        pageSize,
        page,
        require:false,
        withRelated: ['productionCompany', 'categories', 'poster', 'languages', 'movieScenes', 'movieScenes.movieSet', 'movieScenes.movieSet.address', 
        'movieScenes.movieSet.address.street', 'actors', 'actors.nationality', 'actors.actorPhoto','actors.awards', 'actors.awards.award', 'actors.studies', 
        'actors.studies.institution', 'actors.studies.degree', 'productionCrew', 'productionCrew.address',
        'productionCrew.address.street', 'productionCrew.address.street.location', 'productionCrew.address.street.location.country', 
        'productionCrew.productionCrewType']
    })).toJSON();

    const pagination = {
        page,
        pageSize,
        pageCount
    };

    return {
        results: rows,
        pagination
    };
};


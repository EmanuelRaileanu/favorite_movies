import knex from 'knex';
import { MovieCategory } from '../entities/movie_categories';
import { Movie } from '../entities/movies';
import { Actor } from '../entities/actors';
import { Nationality } from '../entities/nationalities';
import { Institution } from '../entities/institutions';
import { Degree } from '../entities/degrees';
import { AwardName } from '../entities/award_list';
import { ProductionCrewType } from '../entities/production_crew_types';
import { ContentRating } from '../entities/content_ratings';
import { ProductionCrew } from '../entities/production_crew';
import { ProductionCompany } from '../entities/production_companies';
import { Country } from '../entities/countries';
import { Language } from '../entities/languages';
import * as type from '../utilities/customTypes';

export async function checkIfCategoryExists(categoryId: number): Promise<boolean>{
    const find = await new MovieCategory({id: categoryId}).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export async function checkIfMovieExists(id: number): Promise<boolean>{
    const find = await new Movie({id}).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export async function checkIfMovieExistsByTitle(title: string): Promise<boolean>{
    const find = await new Movie({title}).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export async function checkIfInstitutionExists(id: number): Promise<boolean>{
    const find = new Institution({id}).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export async function checkIfDegreeExists(id: number): Promise<boolean>{
    const find = new Degree({id}).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export async function checkIfAwardExists(id: number): Promise<boolean>{
    const find = new AwardName({id}).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export async function checkIfNationalityExists(nationality: string): Promise<boolean>{
    const find = await new Nationality({nationality}).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export async function checkIfActorExists(id: number): Promise<boolean>{
    const find = await new Actor({id}).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export async function checkIfActorExistsByName(name: type.Name): Promise<boolean>{
    const find = await new Actor(name).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export async function checkIfProductionCrewMemberExists(name: type.Name): Promise<boolean>{
    const find = await new ProductionCrew(name).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export async function checkIfProductionCompanyExists(name: string): Promise<boolean>{
    const find = await new ProductionCompany({name}).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export async function checkIfLanguageExists(language: type.Language): Promise<boolean>{
    const find = await new Language(language).fetch({require: false});
    if(!find){
        return false;
    }
    return true;
}

export async function getNationalityId(nationality: string){
    return await (await new Nationality({nationality}).fetch({require: false})).get('id');
}

export async function getProductionCrewTypeId(type: string){
    return await (await new ProductionCrewType({type}).fetch({require: false})).get('id');
}

export async function getContentRatingId(rating: string){
    return await (await new ContentRating({rating}).fetch({require: false})).get('id');
}

export async function getProductionCompanyId(name: string){
    return await (await new ProductionCompany({name}).fetch({require: false})).get('id');
}

export async function getCategoryId(category: string){
    return await (await new MovieCategory({category}).fetch({require: false})).get('id');
}

export async function getCountryId(countryName: string){
    return await (await new Country({countryName}).fetch({require: false})).get('id');
}

export async function getProductionCrewMemberId(name: type.Name){
    return await (await new ProductionCrew(name).fetch({require: false})).get('id');
}

export async function getActorId(name: type.Name){
    return await (await new Actor(name).fetch({require: false})).get('id');
}

export async function getLanguageId(language: string){
    return await (await new Language({language}).fetch({require: false})).get('id');
}
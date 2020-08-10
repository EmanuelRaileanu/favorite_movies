import knex from 'knex';
import { MovieCategory } from '../entities/movie_categories';
import { Movie } from '../entities/movies';
import { Actor } from '../entities/actors';
import { Nationality } from '../entities/nationalities';
import { Institution } from '../entities/institutions';
import { Degree } from '../entities/degrees';
import { AwardName } from '../entities/award_list';

// For ../entities/movies_controller.ts

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

// For ../entities/actors_controller.ts

export async function  getNationalityId(nationality: string): Promise<boolean>{
    return await (await new Nationality({nationality}).fetch({require: false})).get('id');
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



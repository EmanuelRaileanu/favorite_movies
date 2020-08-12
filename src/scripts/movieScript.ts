import { searchMovieByTitle } from '../utilities/omdbAPIFunctions';
import inquirer from 'inquirer';
import { knex } from '../utilities/knexconfig';
import { Movie } from '../entities/movies';
import { Actor } from '../entities/actors';
import { ProductionCompany } from '../entities/production_companies';
import { ProductionCrew } from '../entities/production_crew';
import { Language } from '../entities/languages';
import { exit } from 'process';
import moment from 'moment';
import { ContentRating } from '../entities/content_ratings';
import { Country } from '../entities/countries';
import { MovieCategory } from '../entities/movie_categories';
import { ProductionCrewType } from '../entities/production_crew_types';
// run with npm run script

let movieList: any[] = [];

async function sendMovieListToDatabase(){
    await knex.transaction(async trx => {
        for(const movie of movieList){
            if(!await new Movie({title: movie.Title}).checkIfExists(trx)){
                let prodCompId;
                let prodCompArray: string[] = [];
                if(!await new ProductionCompany({name: movie.Production}).checkIfExists(trx) && !prodCompArray.includes(movie.Production)){
                    prodCompId = await (await new ProductionCompany().save({name: movie.Production}, {transacting: trx, method: 'insert'})).get('id');
                }
                else{
                    prodCompId = await new ProductionCompany({name: movie.Production}).getId(trx);
                }

                const releaseDate = moment(movie.Released, 'DD MMM YYYY').format('YYYY-MM-DD');
                const movieEntry = {
                    title: movie.Title,
                    description: movie.Plot,
                    releaseDate,
                    runtime: movie.Runtime,
                    overallRating: parseInt(movie.imdbRating, 10),
                    gross: parseInt(movie.BoxOffice.replace(/,|\$/g, ''), 10) || null,
                    awards: movie.Awards,
                    contentRatingId: await new ContentRating({rating: movie.Rated}).getId(trx),
                    countryId: await new Country({countryName: movie.Country.split(', ')[0]}).getId(trx),
                    ProductionCompanyId: prodCompId
                };
                const movieId = await (await new Movie().save(movieEntry, {transacting: trx, method: 'insert'})).get('id');
                const categoriesIds = await Promise.all(movie.Genre.split(', ').map(async (categoryName: string) => await new MovieCategory({category: categoryName}).getId(trx)));
                await new Movie({id: movieId}).categories().attach(categoriesIds, {transacting: trx});
                
                const productionCrewTypesIds: {[name: string]: number[]} = {};
                const productionCrew: any[] = [];
                const directors = movie.Director.split(', ');
                for(const director of directors){
                    let x;
                    if(director.indexOf(' (') !== -1){
                        x = director.substring(0, director.indexOf(' (')).split(' ');
                    }
                    else{
                        x = director.split(' ');
                    }
                    let firstName = x[0];
                    let lastName;
                    if(x.length > 2){
                        firstName += ' ' + x[1];
                        lastName = x[2];
                    }
                    else{
                        lastName = x[1];
                    }
                    const name = `${firstName} ${lastName}`;
                    productionCrewTypesIds[name] = [await new ProductionCrewType({type: 'Producer'}).getId(trx)];
                    productionCrew.push({
                        firstName,
                        lastName,
                        productionCompanyId: prodCompId
                    });
                }
                
                const writers = movie.Writer.split(', ');
                for(const writer of writers){
                    let x;
                    if(writer.indexOf(' (') !== -1){
                        x = writer.substring(0, writer.indexOf(' (')).split(' ');
                    }
                    else{
                        x = writer.split(' ');
                    }
                    let firstName = x[0];
                    let lastName;
                    if(x.length > 2){
                        firstName += ' ' + x[1];
                        lastName = x[2];
                    }
                    else{
                        lastName = x[1];
                    }
                    const name = `${firstName} ${lastName}`;
                    if(productionCrewTypesIds[name] === undefined){
                        productionCrewTypesIds[name] = [await new ProductionCrewType({type: 'Writer'}).getId(trx)];
                    }
                    else{
                        productionCrewTypesIds[name].push(await new ProductionCrewType({type: 'Writer'}).getId(trx));
                    }
                    const entry = {
                        firstName,
                        lastName,
                        productionCompanyId: prodCompId
                    }
                    if(!productionCrew.some(person => person.firstName === entry.firstName && person.lastName === entry.lastName)){
                        productionCrew.push(entry);
                    }
                }

                const productionCrewIds: number[] = [];
                for(const productionCrewMember of productionCrew){
                    if(!await new ProductionCrew({firstName: productionCrewMember.firstName, lastName: productionCrewMember.lastName}).checkIfExists(trx)){
                        const id = await (await new ProductionCrew().save(productionCrewMember, {transacting: trx, method: 'insert'})).get('id');
                        productionCrewIds.push(id);
                        const name = `${productionCrewMember.firstName} ${productionCrewMember.lastName}`;
                        await new ProductionCrew({id}).productionCrewType().attach(productionCrewTypesIds[name], {transacting: trx});
                    }
                    else{
                        productionCrewIds.push(await new ProductionCrew({ firstName: productionCrewMember.firstName, lastName: productionCrewMember.lastName }).getId(trx));
                    }
                }
                await new Movie({id: movieId}).productionCrew().attach(productionCrewIds, {transacting: trx});

                const actors: any[] = [];
                const actorNames = movie.Actors.split(', ');
                for(const actor of actorNames){
                    const x = actor.split(' ');
                    let firstName = x[0];
                    let lastName;
                    if(x.length > 2){
                        firstName += ' ' + x[1];
                        lastName = x[2];
                    }
                    else{
                        lastName = x[1];
                    }
                    actors.push({
                        firstName,
                        lastName
                    });
                }

                const actorsIds: number[] = [];
                for(const actor of actors){
                    if(!await new Actor({name: actor}).checkIfExists(trx)){
                        actorsIds.push(await (await new Actor().save(actor, {transacting: trx, method: 'insert'})).get('id'));
                    }
                    else{
                        actorsIds.push(await new Actor({name: actor}).getId(trx));
                    }
                }
                await new Movie({id: movieId}).actors().attach(actorsIds, {transacting: trx});

                const languagesIds: number[] = [];
                const languages: string = movie.Language.split(', ');
                for(const language of languages){
                    if(! await new Language({language}).checkIfExists(trx)){
                        languagesIds.push(await (await new Language().save({language}, {transacting: trx, method: 'insert'})).get('id'));
                    }
                    else{
                        languagesIds.push(await new Language({language}).getId(trx));
                    }
                }
                await new Movie({id: movieId}).languages().attach(languagesIds, {transacting: trx});
            }
        }
    });
}

async function saveMovie(movie: any){
    let ans = await inquirer.prompt({
        name: 'choice',
        type: 'input',
        message: "Add movie to the list? y(yes)/any key for 'no'\n",
        validate: function( value ) {
            if (value.length) {
                return true;
            } 
            else{
                return false;
            }
        }
    });
    switch(ans.choice){
        case 'y':
            movieList.push(movie);
            break;
        default:
            break;
    }
}

async function showMovieList(){
    let counter = 0;
    if(!movieList.length){
        console.log('There are no movies in the list.');
    }
    else{
        for(const movie of movieList){
            console.log(`${++counter}. ${movie.Title}`);
        }

        let ans = await inquirer.prompt({
            name: 'choice',
            type: 'input',
            message: "1. Save movies\n2. Clear list\n3. Go back to the main menu.\n",
            validate: function( value ) {
                if (value.length) {
                    return true;
                } 
                else{
                    return false;
                }
            }
        });
        switch(ans.choice){
            case '1':
                await sendMovieListToDatabase();
                break;
            case '2':
                movieList = [];
                console.log('List cleared.');
                break;
            case '3':
                break;
            default:
                console.log('Error: Invalid option!');
        }
    }
}

async function searchMovies(){
    let inSearchMenu = true;
    while(inSearchMenu){
        let ans = await inquirer.prompt({
            name: 'choice',
            type: 'input',
            message: "--- Search Movies ---\nEnter title or type 'exit' to return to main menu: ",
            validate: function( value ) {
                if (value.length) {
                    return true;
                } 
                else{
                    return false;
                }
            }
        });
        switch(ans.choice){
            case 'exit':    
                inSearchMenu = false;
                break;
            default: 
                const movie = await searchMovieByTitle(ans.choice);
                console.log(movie);
                await saveMovie(movie);
                break;
        }
    }
}

async function main(){
    while(true){
        let ans = await inquirer.prompt({
            name: 'choice',
            type: 'input',
            message: '--- Favorite Movies ---\n1. Search movies\n2. Movie list\n3. Exit\n',
            validate: function( value ) {
                if (value.length) {
                  return true;
                } else {
                  return false;
                }
            }
        });
        switch(ans.choice){
            case '1': 
                await searchMovies();
                break;
            case '2':
                await showMovieList();
                break;
            case '3':
                exit();
            default:
                console.log('Error: Wrong input!');
                break;
        }
    }
}

main();





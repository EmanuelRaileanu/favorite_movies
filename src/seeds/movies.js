const dotenv = require('dotenv');
const config = require('../../knexfile');

dotenv.config();
const knex = require('knex')(config.development);

async function checkUniqueTitle(movie){
  const movieTitle = await knex('movies').where({title: movie.title}).first();
  if(!movieTitle){
    return true;
  }
  return false;
}

async function checkUniqueName(company){
  const companyName = await knex('production_companies').where({ name: company }).first();
  if(!companyName){
    return true;
  }
  return false;
}

async function checkUniqueCategory(category){
  const entry = await knex('movie_categories').where({ category: category }).first();
  if(!entry){
    return true;
  }
  return false;
}

async function checkUniqueMovieCategoryEntry(entry){
  const find = await knex('movies_movie_categories').where({ movieId: entry.movieId }).where({ categoryId: entry.categoryId}).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueNationality(nationality){
  const find = await knex('nationalities').where({ nationality }).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueInstitution(institution){
  const find = await knex('institutions').where({ institution }).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueDegree(degree){
  const find = await knex('degrees').where({ degree }).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueAward(awardName){
  const find = await knex('award_list').where({ awardName }).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueCountry(countryName){
  const find = await knex('countries').where({ countryName }).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueLocation(location){
  const find = await knex('locations').where({ location }).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueStreet(streetName){
  const find = await knex('streets').where({ streetName }).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueAddress(address){
  const find = await knex('addresses').where(address);
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueSet(movieSetName){
  const find = await knex('movie_sets').where({ movieSetName }).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueProductionCrewType(type){
  const find = await knex('production_crew_types').where({ type }).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueProductionCrewMember(name){
  const find = await knex('production_crew').where(name).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueMovieScene(movieSceneName){
  const find = await knex('movie_scenes').where({ movieSceneName }).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkForNoCategory(id){
  const find = await knex('movies_movie_categories').where({ movieId: id }).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueProductionCrewMovieEntry(entry){
  const find = await knex('production_crew_movies').where(entry).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueActor(name){
  const find = await knex('actors').where(name).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueActorMovie(entry){
  const find = await knex('movies_actors').where(entry).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueProductionCrewMovieSceneEntry(entry){
  const find = await knex('production_crew_movie_scenes').where(entry);
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueActorStudies(entry){
  const find = await knex('studies').where(entry).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueActorAward(award){
  const find = await knex('awards').where(award).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueActorMovieScene(entry){
  const find = await knex('actors_movie_scenes').where(entry).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueLanguage(language){
  const find = await knex('languages').where({language}).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueMovieLanguageEntry(entry){
  const find = await knex('movies_languages').where(entry).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueContentRating(rating){
  const find = await knex('content_ratings').where({rating}).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueProductionCrewAssociatedTypeEntry(entry){
  const find = await knex('production_crew_associated_types').where(entry).first();
  if(!find){
    return true;
  }
  return false;
}

async function getMovieId(title){
  return (await knex('movies').where({title: title}).first()).id;
}

async function getProductionCompanyId(name){
  return (await knex('production_companies').where({name}).first()).id;
}

async function getCategoryId(category){
  return (await knex('movie_categories').where({category: category}).first()).id;
}

async function getNationalityId(nationality){
  return (await knex('nationalities').where({nationality}).first()).id;
}

async function getActorId(name){
  return (await knex('actors').where(name).first()).id;
}

async function getCountryId(countryName){
  return (await knex('countries').where({countryName}).first()).id;
}

async function getLocationId(location){
  return (await knex('locations').where({location}).first()).id;
}

async function getProductionCrewTypeId(type){
  return (await knex('production_crew_types').where({type}).first()).id;
}

async function getSetId(movieSetName){
  return (await knex('movie_sets').where({movieSetName}).first()).id;
}

async function getProductionCrewMemberId(name){
  return (await knex('production_crew').where(name).first()).id;
}

async function getMovieSceneId(movieSceneName){
  return (await knex('movie_scenes').where({movieSceneName}).first()).id;
}

async function getInstitutionId(institution){
  return (await knex('institutions').where({institution}).first()).id;
}

async function getAwardId(awardName){
  return (await knex('award_list').where({awardName}).first()).id;
}

async function getDegreeId(degree){
  return (await knex('degrees').where({degree}).first()).id;
}

async function getLanguageId(language){
  return (await knex('languages').where({language}).first()).id;
}

async function getContentRatingId(rating){
  return (await knex('content_ratings').where({rating}).first()).id;
}

exports.seed = async function(knex) {

  const productionCompanies = {
    marvel: { name: 'Marvel Studios'},
    other: { name: 'Other'},
    summit: { name: 'Summit Entertainment'}
  };

  for(let i =0; i < Object.keys(productionCompanies).length; i++){
    if(await checkUniqueName(productionCompanies[Object.keys(productionCompanies)[i]].name)){
      let id = await knex('production_companies').insert(productionCompanies[Object.keys(productionCompanies)[i]]);
      productionCompanies[Object.keys(productionCompanies)[i]].id = id;
    }
  }

  const seed = [
    { 
      title: 'Inception',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      runtime: '148min',
      releaseDate: '2010-07-30',
      budget: 160000000.00,
      gross: 828322032.00,
      overallRating: 8.8,
      ProductionCompanyId: parseInt(productionCompanies.other.id, 10)
    },
    {
      title: 'John Wick',
      description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
      runtime: '101min',
      releaseDate: '2014-10-31',
      budget: 40000000.00,
      gross: 86013056.00,
      overallRating: 7.4,
      ProductionCompanyId: parseInt(productionCompanies.summit.id, 10)
    },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
      runtime: '178min',
      releaseDate: '2002-02-01',
      budget: 93000000.00,
      gross: 883726270.00,
      overallRating: 8.8,
      ProductionCompanyId: parseInt(productionCompanies.other.id, 10)
    },
    {
      title: 'Avengers: Infinity War',
      description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
      runtime: '149min',
      releaseDate: '2018-04-23',
      budget: 316000000.00,
      gross: 2048359754.00,
      overallRating: 8.8,
      ProductionCompanyId: parseInt(productionCompanies.marvel.id, 10)
    },
    {
      title: 'The Dark Knight',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      runtime: '152min',
      releaseDate: '2008-07-25',
      budget: 180000000.00,
      gross: 1003045358.00,
      overallRating: 9.0,
      ProductionCompanyId: parseInt(productionCompanies.other.id, 10)
    },
    {
      title: 'The Hobbit: An Unexpected Journey',
      description: 'A reluctant Hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home, and the gold within it from the dragon Smaug.',
      runtime: '169min',
      releaseDate: '2012-12-14',
      budget: 180000000.00,
      gross: 1017003568.00,
      overallRating: 7.8,
      ProductionCompanyId: parseInt(productionCompanies.other.id, 10)
    },
    {
      title: 'Thor: Ragnarok',
      description: 'Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.',
      runtime: '130min',
      releaseDate: '2017-10-27',
      budget: 180000000.00,
      gross: 853977126.00,
      overallRating: 7.9,
      ProductionCompanyId: parseInt(productionCompanies.marvel.id, 10)
    },
    {
      title: 'Interstellar',
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      runtime: '169min',
      releaseDate: '2014-11-07',
      budget: 165000000.00,
      gross: 677463813.00,
      overallRating: 8.6,
      ProductionCompanyId: parseInt(productionCompanies.other.id, 10)
    },
    {
      title: 'The Hangover',
      description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
      runtime: '100min',
      releaseDate: '2009-06-12',
      budget: 35000000.00,
      gross: 468812793.00,
      overallRating: 7.7,
      ProductionCompanyId: parseInt(productionCompanies.other.id, 10)
    },
    {
      title: 'Anchorman: The Legend of Ron Burgundy',
      description: "Ron Burgundy is San Diego's top-rated newsman in the male-dominated broadcasting of the 1970s, but that's all about to change for Ron and his cronies when an ambitious woman is hired as a new anchor.",
      runtime: '94min',
      releaseDate: '2004-07-09',
      budget: 26000000.00,
      gross: 90649730.00,
      overallRating: 7.2,
      ProductionCompanyId: parseInt(productionCompanies.other.id, 10)
    }
  ];

  for(let i = 0; i < seed.length; i++){
    if(await checkUniqueTitle(seed[i])){
      await knex('movies').insert(seed[i]);
    }
  }

  const categorySeed = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Adventure', 'Family',
                        'Sci-Fi', 'Crime', 'Historical', 'Historical fiction', 'Horror', 'Magical realism', 'Paranoid fiction', 
                        'Philosophical', 'Political', 'Urban', 'Animation'];
  for(let i = 0; i < categorySeed.length; i++){
    if(await checkUniqueCategory(categorySeed[i])){
      await knex('movie_categories').insert({ category: categorySeed[i] });
    }
  }

  const movieCategorySeed = [
    {
      movieId: await getMovieId('Inception'),
      categoryId: await getCategoryId('Fantasy')
    },
    {
      movieId: await getMovieId('Inception'),
      categoryId: await getCategoryId('Action')
    },
    {
      movieId: await getMovieId('Thor: Ragnarok'),
      categoryId: await getCategoryId('Action')
    }
  ];

  for(let i = 0; i < movieCategorySeed.length; i++){
    if(await checkUniqueMovieCategoryEntry(movieCategorySeed[i])){
      await knex('movies_movie_categories').insert(movieCategorySeed[i]);
    }
  }

  for(let i = 0; i < seed.length; i++){
    const id = await getMovieId(seed[i].title);
    if(await checkForNoCategory(id)){
      await knex('movies_movie_categories')
        .insert({
          movieId: id,
          categoryId: Math.floor(Math.random() * movieCategorySeed.length) + 1
        });
      let entry;
      do{
        entry = {
          movieId: id,
          categoryId: Math.floor(Math.random() * movieCategorySeed.length) + 1
        };
      }while(!await checkUniqueMovieCategoryEntry(entry));
      await knex('movies_movie_categories').insert(entry);
    }
  }

  const actorNationalitySeed = ['American', 'Australian',  'Canadian',  'Romanian', 'Irish', 'Spanish', 'Italian', 'Norwegian', 'Other'];
  for(const nationality of actorNationalitySeed){
    if(await checkUniqueNationality(nationality)){
      await knex('nationalities').insert({ nationality });
    }
  }

  const institutionsSeed = ['Princeton University', 'Harvard University', 'Columbia University', 'Massachusets Institute of Technology', 'Yale University'];
  for(const institution of institutionsSeed){
    if(await checkUniqueInstitution(institution)){
      await knex('institutions').insert({ institution });
    }
  }

  const degreesSeed = ['Associate degree', "Bachelor's degree", "Master's degree", "Doctoral degree"];
  for(const degree of degreesSeed){
    if(await checkUniqueDegree(degree)){
      await knex('degrees').insert({ degree });
    }
  }

  const awardListSeed = ['The Oscars', 'Golden Globes', 'Filmfare Awards', 'Bafta Awards'];
  for(const awardName of awardListSeed){
    if(await checkUniqueAward(awardName)){
      await knex('award_list').insert({ awardName });
    }
  }

  const actorSeed = [
    {
      firstName: "Chris",
	    lastName: "Hemsworth",
      dateOfBirth: "1983-08-11",
      nationalityId: await getNationalityId("Australian"),
      fbProfileLink: "https://www.facebook.com/chrishemsworth/",
      shortDescription: "I am Thor, the God of Hammers."
    },
    {
      firstName: "Chris",
	    lastName: "Evans",
      dateOfBirth: "1979-02-12",
      nationalityId: await getNationalityId("American"),
      fbProfileLink: "https://www.facebook.com/chrishemsworth/",
      shortDescription: "Something."
    },
    {
      firstName: "Keanu",
	    lastName: "Reeves",
      dateOfBirth: "1964-01-01",
      nationalityId: await getNationalityId("American"),
      fbProfileLink: "https://www.facebook.com/chrishemsworth/",
      shortDescription: "No, you're breathtaking."
    }
  ];
  for(const actor of actorSeed){
    if(await checkUniqueActor({ firstName: actor.firstName, lastName: actor.lastName })){
      await knex('actors').insert(actor);
    }
  }

  const actorMoviesSeed = [
    {
      actorId: await getActorId({ firstName: 'Chris', lastName: 'Hemsworth' }),
      movieId: await getMovieId('Avengers: Infinity War')
    },
    {
      actorId: await getActorId({ firstName: 'Chris', lastName: 'Evans' }),
      movieId: await getMovieId('Avengers: Infinity War')
    },
    {
      actorId: await getActorId({ firstName: 'Chris', lastName: 'Hemsworth' }),
      movieId: await getMovieId('Thor: Ragnarok')
    },
    {
      actorId: await getActorId({ firstName: 'Keanu', lastName: 'Reeves' }),
      movieId: await getMovieId('John Wick')
    },
  ];
  for(const entry of actorMoviesSeed){
    if(await checkUniqueActorMovie(entry)){
      await knex('movies_actors').insert(entry);
    }
  }

  const actorStudiesSeed = [
    {
      actorId: await getActorId({ firstName: 'Chris', lastName: 'Hemsworth' }),
      institutionId: await getInstitutionId('Princeton University'),
      degreeId: await getDegreeId("Master's Degree"),
      graduationYear: 2000
    },
    {
      actorId: await getActorId({ firstName: 'Chris', lastName: 'Evans' }),
      institutionId: await getInstitutionId('Columbia University'),
      degreeId: await getDegreeId("Bachelor's Degree"),
      graduationYear: 1997
    },
    {
      actorId: await getActorId({ firstName: 'Keanu', lastName: 'Reeves' }),
      institutionId: await getInstitutionId('Princeton University'),
      degreeId: await getDegreeId("Bachelor's Degree"),
      graduationYear: 1985
    },
    {
      actorId: await getActorId({ firstName: 'Keanu', lastName: 'Reeves' }),
      institutionId: await getInstitutionId('Harvard University'),
      degreeId: await getDegreeId("Master's Degree"),
      graduationYear: 1990
    }
  ];
  for(const actorStudies of actorStudiesSeed){
    if(await checkUniqueActorStudies(actorStudies)){
      await knex('studies').insert(actorStudies);
    }
  }

  const ActorsAwardsSeed = [
    {
      actorId: await getActorId({ firstName: 'Chris', lastName: 'Hemsworth' }),
      awardId: await getAwardId('The Oscars'),
      movie: 'Thor: Ragnarok',
      movieCharacter: 'Thor',
      year: 2018
    },
    {
      actorId: await getActorId({ firstName: 'Chris', lastName: 'Hemsworth' }),
      awardId: await getAwardId('Filmfare Awards'),
      movie: 'Avengers: Infinity War',
      movieCharacter: 'Thor',
      year: 2018
    },
    {
      actorId: await getActorId({ firstName: 'Chris', lastName: 'Evans' }),
      awardId: await getAwardId('The Oscars'),
      movie: 'Avengers: Endgame',
      movieCharacter: 'Captain America',
      year: 2019
    },
    {
      actorId: await getActorId({ firstName: 'Keanu', lastName: 'Reeves' }),
      awardId: await getAwardId('The Oscars'),
      movie: 'John Wick',
      movieCharacter: 'John Wick',
      year: 2014
    },
    {
      actorId: await getActorId({ firstName: 'Keanu', lastName: 'Reeves' }),
      awardId: await getAwardId('The Oscars'),
      movie: 'The matrix',
      movieCharacter: 'Neo',
      year: 2002
    },
  ];
  for(const actorAward of ActorsAwardsSeed){
    if(await checkUniqueActorAward(actorAward)){
      await knex('awards').insert(actorAward);
    }
  }

  const countrySeed = ['USA', 'Canada', 'Germany', 'Australia', 'Romania', 'Italy', 'Spain', 'Iceland', 'Norway', 'UK', 'Other', 'New Zealand'];
  for(const countryName of countrySeed){
    if(await checkUniqueCountry(countryName)){
      await knex('countries').insert({ countryName });
    }
  }

  const locationSeed = [
    {
      location: 'Bucharest',
      countryId: await getCountryId('Romania')
    },
    {
      location: 'Timisoara',
      countryId: await getCountryId('Romania')
    },
    {
      location: 'Washington DC',
      countryId: await getCountryId('USA')
    },
    {
      location: 'New York',
      countryId: await getCountryId('USA')
    },
    {
      location: 'Los Angeles',
      countryId: await getCountryId('USA')
    },
    {
      location: 'Madrid',
      countryId: await getCountryId('Spain')
    },
    {
      location: 'Rome',
      countryId: await getCountryId('Italy')
    },
    {
      location: 'Somewhere',
      countryId: await getCountryId('Other')
    }
  ];
  for(const location of locationSeed){
    if(await checkUniqueLocation(location.location)){
      await knex('locations').insert(location);
    }
  }

  const streetSeed = [
    {
      streetName: 'Allen Street',
      locationId: await getLocationId('New York')
    },
    {
      streetName: 'Eldridge Street',
      locationId: await getLocationId('New York')
    },
    {
      streetName: 'Minnesota Avenue',
      locationId: await getLocationId('Washington DC')
    },
    {
      streetName: 'Bulevardul Unirii',
      locationId: await getLocationId('Bucharest')
    },
    {
      streetName: 'Random Street',
      locationId: await getLocationId('Somewhere')
    },
  ];
  for(const street of streetSeed){
    if(await checkUniqueStreet(street.streetName)){
      await knex('streets').insert(street);
    }
  }

  for(let i = 0; i < 2 * streetSeed.length; i++){
    let address = {
      streetId: Math.floor(Math.random() * streetSeed.length) + 1,
      streetNumber: Math.floor(Math.random() * 10) + 1,
      buildingNumber: Math.floor(Math.random() * 10) + 1,
      appartmentNumber: Math.floor(Math.random() * 10) + 1
    }
    if(checkUniqueAddress(address)){
      await knex('addresses').insert(address);
    }
  }

  const setSeed = [
    {
      movieSetName: 'Cincecitta Studios',
      addressId: Math.floor(Math.random() * 2 * streetSeed.length) + 1
    },
    {
      movieSetName: 'The Empire State Building',
      addressId: Math.floor(Math.random() * 2 * streetSeed.length) + 1
    },
    {
      movieSetName: 'The New York Public Library',
      addressId: Math.floor(Math.random() * 2 * streetSeed.length) + 1
    },
    {
      movieSetName: 'The New York Grand Central Terminal',
      addressId: Math.floor(Math.random() * 2 * streetSeed.length) + 1
    },
    {
      movieSetName: 'Other',
      addressId: Math.floor(Math.random() * 2 * streetSeed.length) + 1
    }
  ];
  for(const set of setSeed){
    if(await checkUniqueSet(set.movieSetName)){
      await knex('movie_sets').insert(set);
    }
  }

  const productionCrewTypesSeed = ['Producer', 'Writer', 'Production manger', 'Production accountant', 'Location manager', 'Legal counsel', 
                                  'Script supervisor', 'Director of photography', 'Camera operator', 'Digital imaging techincian',
                                  'Gaffer', 'Key grip', 'Production sound mixer', 'Art director', 'Set decorator', 'Key scenic', 
                                  'Propmaster', 'Costume designer', 'Key make-up artist', 'Special effects supervisor', 'Stunt coordinator',
                                  'Negative cutter', 'Visual effects creative director', 'Sound designer'];
  for(const productionCrewType of productionCrewTypesSeed){
    if(await checkUniqueProductionCrewType(productionCrewType)){
      await knex('production_crew_types').insert({ type: productionCrewType });
    }
  }
  
  const productionCrewSeed = [
    {
      firstName: 'Anthony',
      lastName: 'Russo',
      dateOfBirth: '1973-06-2',
      addressId: Math.floor(Math.random() * 2 * streetSeed.length) + 1,
      productionCompanyId: await getProductionCompanyId('Marvel Studios')
    },
    {
      firstName: 'Joe',
      lastName: 'Russo',
      dateOfBirth: '1971-07-18',
      addressId: Math.floor(Math.random() * 2 * streetSeed.length) + 1,
      productionCompanyId: await getProductionCompanyId('Marvel Studios')
    },
    {
      firstName: 'Chad',
      lastName: 'Stahelski',
      dateOfBirth: '1968-09-20',
      addressId: Math.floor(Math.random() * 2 * streetSeed.length) + 1,

      productionCompanyId: await getProductionCompanyId('Summit Entertainment')
    }
  ];
  for(const productionCrewMember of productionCrewSeed){
    if(await checkUniqueProductionCrewMember({ firstName: productionCrewMember.firstName, lastName: productionCrewMember.lastName })){
      await knex('production_crew').insert(productionCrewMember);
    }
  }

  const productionCrewAssociatedTypesSeed = [
    {
      productionCrewMemberId: await getProductionCrewMemberId({ firstName: 'Anthony', lastName: 'Russo' }),
      typeId: await getProductionCrewTypeId('Producer')
    },
    {
      productionCrewMemberId: await getProductionCrewMemberId({ firstName: 'Joe', lastName: 'Russo' }),
      typeId: await getProductionCrewTypeId('Producer')
    },
    {
      productionCrewMemberId: await getProductionCrewMemberId({ firstName: 'Chad', lastName: 'Stahelski' }),
      typeId: await getProductionCrewTypeId('Producer')
    }
  ];
  for(const productionCrewAssociatedType of productionCrewAssociatedTypesSeed){
    if(await checkUniqueProductionCrewAssociatedTypeEntry(productionCrewAssociatedType)){
      await knex('production_crew_associated_types').insert(productionCrewAssociatedType);
    }
  }

  let sceneCount = Array(seed.length).fill(0)
  const movieScenesSeed = [
    {
      movieSceneName: 'Iron Man Vs Thanos Fight Scene',
      setId: await getSetId('Other'),
      movieId: await getMovieId('Avengers: Infinity War'),
      productionCode: `#${await getMovieId('Avengers: Infinity War')}.${++sceneCount[await getMovieId('Avengers: Infinity War') - 1]}`
    },
    {
      movieSceneName: 'Thor Arrives in Wakanda Scene',
      setId: await getSetId('Other'),
      movieId: await getMovieId('Avengers: Infinity War'),
      productionCode: `#${await getMovieId('Avengers: Infinity War')}.${++sceneCount[await getMovieId('Avengers: Infinity War') - 1]}`
    },
    {
      movieSceneName: 'The Break-In',
      setId: await getSetId('Other'),
      movieId: await getMovieId('John Wick'),
      productionCode: `#${await getMovieId('John Wick')}.${++sceneCount[await getMovieId('John Wick') - 1]}`
    }
  ];
  for(const movieScene of movieScenesSeed){
    if(await checkUniqueMovieScene(movieScene.movieSceneName)){
      await knex('movie_scenes').insert(movieScene);
    }
  }

  const productionCrewMoviesSeed = [
    {
      productionCrewMemberId: await getProductionCrewMemberId({ firstName: 'Anthony', lastName: 'Russo' }),
      movieId: await getMovieId('Avengers: Infinity War')
    },
    {
      productionCrewMemberId: await getProductionCrewMemberId({ firstName: 'Joe', lastName: 'Russo' }),
      movieId: await getMovieId('Avengers: Infinity War')
    },
    {
      productionCrewMemberId: await getProductionCrewMemberId({ firstName: 'Chad', lastName: 'Stahelski' }),
      movieId: await getMovieId('John Wick')
    }
  ];
  for(const entry of productionCrewMoviesSeed){
    if(await checkUniqueProductionCrewMovieEntry(entry)){
      await knex('production_crew_movies').insert(entry);
    }
  }

  const productionCrewMovieScenesSeed = [
    {
      productionCrewMemberId: await getProductionCrewMemberId({ firstName: 'Anthony', lastName: 'Russo' }),
      movieSceneId: await getMovieSceneId('Iron Man Vs Thanos Fight Scene')
    },
    {
      productionCrewMemberId: await getProductionCrewMemberId({ firstName: 'Joe', lastName: 'Russo' }),
      movieSceneId: await getMovieSceneId('Iron Man Vs Thanos Fight Scene')
    },
    {
      productionCrewMemberId: await getProductionCrewMemberId({ firstName: 'Anthony', lastName: 'Russo' }),
      movieSceneId: await getMovieSceneId('Thor Arrives in Wakanda Scene')
    },
    {
      productionCrewMemberId: await getProductionCrewMemberId({ firstName: 'Joe', lastName: 'Russo' }),
      movieSceneId: await getMovieSceneId('Thor Arrives in Wakanda Scene')
    },
    {
      productionCrewMemberId: await getProductionCrewMemberId({ firstName: 'Chad', lastName: 'Stahelski' }),
      movieSceneId: await getMovieSceneId('The Break-In')
    }
  ];
  for(const entry of productionCrewMovieScenesSeed){
    if(await checkUniqueProductionCrewMovieSceneEntry(entry)){
      await knex('production_crew_movie_scenes').insert(entry);
    }
  }

  const actorsMovieScenesSeed = [
    {
      actorId: await getActorId({ firstName: 'Chris', lastName: 'Hemsworth' }),
      sceneId: await getMovieSceneId('Thor Arrives in Wakanda Scene')
    },
    {
      actorId: await getActorId({ firstName: 'Chris', lastName: 'Evans' }),
      sceneId: await getMovieSceneId('Thor Arrives in Wakanda Scene')
    },
    {
      actorId: await getActorId({ firstName: 'Keanu', lastName: 'Reeves' }),
      sceneId: await getMovieSceneId('The Break-In')
    }
  ];
  for(const actorMovieScene of actorsMovieScenesSeed){
    if(await checkUniqueActorMovieScene(actorMovieScene)){
      await knex('actors_movie_scenes').insert(actorMovieScene);
    }
  }

  const languagesSeed = ['English', 'Spanish', 'Italian', 'German', 'Romanian', 'Russian', 'Mandarin', 'Chinese', 'French', 'Japanese'];
  for(const language of languagesSeed){
    if(await checkUniqueLanguage(language)){
      await knex('languages').insert({ language });
    }
  }

  for(let i = 0; i < seed.length; i++){
    const languageEntry = {
      movieId: i + 1,
      languageId: await getLanguageId('English')
    };
    if(await checkUniqueMovieLanguageEntry(languageEntry)){
      await knex('movies_languages').insert(languageEntry);
    }
  }

  const constentRatingSeed = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR', 'UR'];
  for(const contentRating of constentRatingSeed){
    if(await checkUniqueContentRating(contentRating)){
      await knex('content_ratings').insert({rating: contentRating});
    }
  }
};

const dotenv = require('dotenv');
dotenv.config();
const config = require('../../knexfile');

const Knex = require('knex')(config.development);

async function checkUniqueTitle(movie){
  const movieTitle = await Knex.from('movies').where({title: movie.title}).first();
  if(!movieTitle){
    return true;
  }
  return false;
}

async function checkUniqueName(company){
  const companyName = await Knex.from('production_companies').where({ name: company.name }).first();
  if(!companyName){
    return true;
  }
  return false;
}

async function checkUniqueCategory(category){
  const entry = await Knex.from('movie_categories').where({ category: category }).first();
  if(!entry){
    return true;
  }
  return false;
}

async function checkUniqueMovieCategoryEntry(entry){
  const find = await Knex.from('movies_movie_categories').where({ movieId: entry.movieId }).where({ categoryId: entry.categoryId}).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkForNoCategory(id){
  const find = await Knex.from('movies_movie_categories').where({ movieId: id }).first();
  if(!find){
    return true;
  }
  return false;
}

async function getMovieId(title){
  return (await Knex.from('movies').where({title: title}).first()).id;
}

async function getCategoryId(category){
  return (await Knex.from('movie_categories').where({category: category}).first()).id;
}

async function checkUniqueNationality(nationality){
  const find = await Knex.from('nationalities').where({ nationality }).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueInstitution(institution){
  const find = await Knex.from('institutions').where({ institution }).first();
  if(!find){
    return true;
  }
  return false;
}

async function checkUniqueDegree(degree){
  const find = await Knex.from('degrees').where({ degree }).first();
  if(!find){
    return true;
  }
  return false;
}

exports.seed = async function(knex) {

  const productionCompanies = {
    marvel: { name: 'Marvel Studios'},
    other: { name: 'Other'},
    summit: { name: 'Summit Entertainment'}
  };

  for(let i =0; i < Object.keys(productionCompanies).length; i++){
    if(await checkUniqueName(productionCompanies[Object.keys(productionCompanies)[i]])){
      let id = await Knex('production_companies').insert(productionCompanies[Object.keys(productionCompanies)[i]]);
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
      ProductionCompanyId: productionCompanies.other.id
    },
    {
      title: 'John Wick',
      description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
      runtime: '101min',
      releaseDate: '2014-10-31',
      budget: 40000000.00,
      gross: 86013056.00,
      overallRating: 7.4,
      ProductionCompanyId: productionCompanies.summit.id
    },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
      runtime: '178min',
      releaseDate: '2002-02-01',
      budget: 93000000.00,
      gross: 883726270.00,
      overallRating: 8.8,
      ProductionCompanyId: productionCompanies.other.id
    },
    {
      title: 'Avengers: Infinity War',
      description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
      runtime: '149min',
      releaseDate: '2018-04-23',
      budget: 316000000.00,
      gross: 2048359754.00,
      overallRating: 8.8,
      ProductionCompanyId: productionCompanies.marvel.id
    },
    {
      title: 'The Dark Knight',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      runtime: '152min',
      releaseDate: '2008-07-25',
      budget: 180000000.00,
      gross: 1003045358.00,
      overallRating: 9.0,
      ProductionCompanyId: productionCompanies.other.id
    },
    {
      title: 'The Hobbit: An Unexpected Journey',
      description: 'A reluctant Hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home, and the gold within it from the dragon Smaug.',
      runtime: '169min',
      releaseDate: '2012-12-14',
      budget: 180000000.00,
      gross: 1017003568.00,
      overallRating: 7.8,
      ProductionCompanyId: productionCompanies.other.id
    },
    {
      title: 'Thor: Ragnarok',
      description: 'Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.',
      runtime: '130min',
      releaseDate: '2017-10-27',
      budget: 180000000.00,
      gross: 853977126.00,
      overallRating: 7.9,
      ProductionCompanyId: productionCompanies.marvel.id
    },
    {
      title: 'Interstellar',
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      runtime: '169min',
      releaseDate: '2014-11-07',
      budget: 165000000.00,
      gross: 677463813.00,
      overallRating: 8.6,
      ProductionCompanyId: productionCompanies.other.id
    },
    {
      title: 'The Hangover',
      description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
      runtime: '100min',
      releaseDate: '2009-06-12',
      budget: 35000000.00,
      gross: 468812793.00,
      overallRating: 7.7,
      ProductionCompanyId: productionCompanies.other.id
    },
    {
      title: 'Anchorman: The Legend of Ron Burgundy',
      description: "Ron Burgundy is San Diego's top-rated newsman in the male-dominated broadcasting of the 1970s, but that's all about to change for Ron and his cronies when an ambitious woman is hired as a new anchor.",
      runtime: '94min',
      releaseDate: '2004-07-09',
      budget: 26000000.00,
      gross: 90649730.00,
      overallRating: 7.2,
      ProductionCompanyId: productionCompanies.other.id
    }
  ];

  for(let i = 0; i < seed.length; i++){
    if(await checkUniqueTitle(seed[i])){
      await Knex('movies').insert(seed[i]);
    }
  }

  const categorySeed = [
    {
      category: 'Action'
    },
    {
      category: 'Comedy'
    },
    {
      category: 'Drama'
    },
    {
      category: 'Fantasy'
    },
    {
      category: 'Horror'
    },
    {
      category: 'Mystery'
    },
    {
      category: 'Romance'
    },
    {
      category: 'Thriller'
    }
  ];

  for(let i = 0; i < categorySeed.length; i++){
    if(await checkUniqueCategory(categorySeed[i].category)){
      await Knex('movie_categories').insert(categorySeed[i]);
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
      await Knex('movies_movie_categories').insert(movieCategorySeed[i]);
    }
  }

  for(let i = 0; i < seed.length; i++){
    const id = await getMovieId(seed[i].title);
    if(await checkForNoCategory(id)){
      await Knex('movies_movie_categories')
        .insert({
          movieId: id,
          categoryId: Math.floor(Math.random() * categorySeed.length) + 1
        });
      let entry;
      do{
        entry = {
          movieId: id,
          categoryId: Math.floor(Math.random() * categorySeed.length) + 1
        };
      }while(!await checkUniqueMovieCategoryEntry(entry));
      await Knex('movies_movie_categories').insert(entry);
    }
  }

  async function checkUniqueNationalityEntry(entry){
    const find = await Knex('nationalities').where({ nationality: entry.nationality }).first();
    if(!find){
      return true;
    }
    return false;
  }

  const actorNationalitySeed = [
    {
      nationality: 'American'
    },
    {
      nationality: 'Australian'
    },
    {
      nationality:  'Canadian'
    },
    {
      nationality:  'Romanian'
    },
    {
      nationality: 'Irish'
    },
    {
      nationality: 'Spanish'
    },
    {
      nationality: 'Italian'
    },
    {
      nationality: 'Other'
    }
  ];

  for(const nationality of actorNationalitySeed){
    if(await checkUniqueNationality(nationality.nationality)){
      await Knex('nationalities').insert(nationality);
    }
  }

  const institutionsSeed = [
    {
      institution: 'Princeton University'
    },
    {
      institution: 'Harvard University'
    },
    {
      institution: 'Columbia University'
    },
    {
      institution: 'Massachusets Institute of Technology'
    },
    {
      institution: 'Yale University'
    }
  ];

  for(const institution of institutionsSeed){
    if(await checkUniqueInstitution(institution.institution)){
      await Knex('institutions').insert(institution);
    }
  }

  const degreesSeed = [
    {
      degree: 'Associate degree'
    },
    {
      degree: "Bachelor's degree"
    },
    {
      degree: "Master's degree"
    },
    {
      degree: "Doctoral degree"
    }
  ];

  for(const degree of degreesSeed){
    if(await checkUniqueDegree(degree.degree)){
      await Knex('degrees').insert(degree);
    }
  }

};

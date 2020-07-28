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
  const companyName = await Knex.from('production_companies').where({name: company.name}).first();
  if(!companyName){
    return true;
  }
  return false;
}

exports.seed = async function(knex) {

  const productionCompanies = {
    marvel: { name: 'Marvel Studios'},
    summit: { name: 'Summit Entertainment'},
    other: { name: 'Other'}
  };

  for(let i =0; i < Object.keys(productionCompanies).length; i++){
    if(await checkUniqueName(productionCompanies[Object.keys(productionCompanies)[i]]) === true){
      let id = await Knex('production_companies').insert(productionCompanies[Object.keys(productionCompanies)[i]]);
      productionCompanies[Object.keys(productionCompanies)[i]]['id'] = id;
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
      ProductionCompanyId: productionCompanies['other'].id
    },
    {
      title: 'John Wick',
      description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
      runtime: '101min',
      releaseDate: '2014-10-31',
      budget: 40000000.00,
      gross: 86013056.00,
      overallRating: 7.4,
      ProductionCompanyId: productionCompanies['summit'].id
    },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
      runtime: '178min',
      releaseDate: '2002-02-01',
      budget: 93000000.00,
      gross: 883726270.00,
      overallRating: 8.8,
      ProductionCompanyId: productionCompanies['other'].id
    },
    {
      title: 'Avengers: Infinity War',
      description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
      runtime: '149min',
      releaseDate: '2018-04-23',
      budget: 316000000.00,
      gross: 2048359754.00,
      overallRating: 8.8,
      ProductionCompanyId: productionCompanies['marvel'].id
    },
    {
      title: 'The Dark Knight',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      runtime: '152min',
      releaseDate: '2008-07-25',
      budget: 180000000.00,
      gross: 1003045358.00,
      overallRating: 9.0,
      ProductionCompanyId: productionCompanies['other'].id
    },
    {
      title: 'The Hobbit: An Unexpected Journey',
      description: 'A reluctant Hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home, and the gold within it from the dragon Smaug.',
      runtime: '169min',
      releaseDate: '2012-12-14',
      budget: 180000000.00,
      gross: 1017003568.00,
      overallRating: 7.8,
      ProductionCompanyId: productionCompanies['other'].id
    },
    {
      title: 'Thor: Ragnarok',
      description: 'Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.',
      runtime: '130min',
      releaseDate: '2017-10-27',
      budget: 180000000.00,
      gross: 853977126.00,
      overallRating: 7.9,
      ProductionCompanyId: productionCompanies['marvel'].id
    },
    {
      title: 'Interstellar',
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      runtime: '169min',
      releaseDate: '2014-11-07',
      budget: 165000000.00,
      gross: 677463813.00,
      overallRating: 8.6,
      ProductionCompanyId: productionCompanies['other'].id
    },
    {
      title: 'The Hangover',
      description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
      runtime: '100min',
      releaseDate: '2009-06-12',
      budget: 35000000.00,
      gross: 468812793.00,
      overallRating: 7.7,
      ProductionCompanyId: productionCompanies['other'].id
    },
    {
      title: 'Anchorman: The Legend of Ron Burgundy',
      description: "Ron Burgundy is San Diego's top-rated newsman in the male-dominated broadcasting of the 1970s, but that's all about to change for Ron and his cronies when an ambitious woman is hired as a new anchor.",
      runtime: '94min',
      releaseDate: '2004-07-09',
      budget: 26000000.00,
      gross: 90649730.00,
      overallRating: 7.2,
      ProductionCompanyId: productionCompanies['other'].id
    }
  ];

  for(let i =0; i < seed.length; i++){
    if(await checkUniqueTitle(seed[i]) === true){
      await Knex('movies').insert(seed[i]);
    }
  }
};

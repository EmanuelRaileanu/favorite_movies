exports.up = function(knex) {
    return knex.schema.createTable('countries', table => {
        table.increments('id').primary();
        table.string('countryName').unique();
    })
    .createTable('locations', table => {
        table.increments('id').primary();
        table.string('location').unique();
        table.integer('countryId').unsigned().references('id').inTable('countries');
    })
    .createTable('streets', table => {
        table.increments('id').primary();
        table.string('streetName').unique();
        table.integer('locationId').unsigned().references('id').inTable('locations');
    })
    .createTable('addresses', table => {
        table.increments('id').primary();
        table.integer('streetId').unsigned().references('id').inTable('streets');
        table.integer('streetNumber');
        table.integer('buildingNumber');
        table.integer('appartmentNumber');
    })
    .createTable('movie_sets', table => {
        table.increments('id').primary();
        table.string('movieSetName').unique();
        table.integer('addressId').unsigned().references('id').inTable('addresses');
    })
    .createTable('production_crew_types', table => {
        table.increments('id').primary();
        table.string('type').unique();
    })
    .createTable('production_crew', table => {
        table.increments('id').primary();
        table.string('firstName');
        table.string('lastName');
        table.date('dateOfBirth');
        table.integer('addressId').unsigned().references('id').inTable('addresses');
        table.integer('typeId').unsigned().references('id').inTable('production_crew_types');
        table.integer('productionCompanyId').unsigned().references('id').inTable('production_companies');
    })
    .createTable('movie_scenes', table => {
        table.increments('id').primary();
        table.string('movieSceneName');
        table.integer('setId').unsigned().references('id').inTable('movie_sets');
        table.integer('movieId').unsigned().references('id').inTable('movies');
        table.string('productionCode').unique();
    })
    .createTable('production_crew_movies', table => {
        table.integer('productionCrewMemberId').unsigned().references('id').inTable('production_crew');
        table.integer('movieId').unsigned().references('id').inTable('movies');
    })
    .createTable('production_crew_movie_scenes', table => {
        table.integer('productionCrewMemberId').unsigned().references('id').inTable('production_crew');
        table.integer('movieSceneId').unsigned().references('id').inTable('movie_scenes');
    })
    .createTable('actors_movie_scenes', table => {
        table.integer('actorId').unsigned().references('id').inTable('actors');
        table.integer('sceneId').unsigned().references('id').inTable('movie_scenes');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('actors_movie_scenes')
        .dropTable('production_crew_movies')
        .dropTable('movie_scenes')
        .dropTable('production_crew')
        .dropTable('production_crew_types')
        .dropTable('movie_sets')
        .dropTable('addresses')
        .dropTable('streets')
        .dropTable('locations')
        .dropTable('countries')
};

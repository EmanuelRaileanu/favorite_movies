import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('countries', table => {
        table.increments('id').primary();
        table.string('countryName').unique();
    })
    await knex.schema.createTable('locations', table => {
        table.increments('id').primary();
        table.string('location').unique();
        table.integer('countryId').unsigned().references('id').inTable('countries');
    })
    await knex.schema.createTable('streets', table => {
        table.increments('id').primary();
        table.string('streetName').unique();
        table.integer('locationId').unsigned().references('id').inTable('locations');
    })
    await knex.schema.createTable('addresses', table => {
        table.increments('id').primary();
        table.integer('streetId').unsigned().references('id').inTable('streets');
        table.integer('streetNumber');
        table.integer('buildingNumber');
        table.integer('appartmentNumber');
    })
    await knex.schema.createTable('movie_sets', table => {
        table.increments('id').primary();
        table.string('movieSetName').unique();
        table.integer('addressId').unsigned().references('id').inTable('addresses');
    })
    await knex.schema.createTable('production_crew_types', table => {
        table.increments('id').primary();
        table.string('type').unique();
    })
    await knex.schema.createTable('production_crew', table => {
        table.increments('id').primary();
        table.string('firstName');
        table.string('lastName');
        table.date('dateOfBirth');
        table.integer('addressId').unsigned().references('id').inTable('addresses');
        table.integer('typeId').unsigned().references('id').inTable('production_crew_types');
        table.integer('productionCompanyId').unsigned().references('id').inTable('production_companies');
    })
    await knex.schema.createTable('movie_scenes', table => {
        table.increments('id').primary();
        table.string('movieSceneName');
        table.integer('setId').unsigned().references('id').inTable('movie_sets');
        table.integer('movieId').unsigned().references('id').inTable('movies');
        table.string('productionCode').unique();
    })
    await knex.schema.createTable('production_crew_movies', table => {
        table.integer('productionCrewMemberId').unsigned().references('id').inTable('production_crew');
        table.integer('movieId').unsigned().references('id').inTable('movies');
    })
    await knex.schema.createTable('production_crew_movie_scenes', table => {
        table.integer('productionCrewMemberId').unsigned().references('id').inTable('production_crew');
        table.integer('movieSceneId').unsigned().references('id').inTable('movie_scenes');
    })
    await knex.schema.createTable('actors_movie_scenes', table => {
        table.integer('actorId').unsigned().references('id').inTable('actors');
        table.integer('sceneId').unsigned().references('id').inTable('movie_scenes');
    })
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('actors_movie_scenes')
    await knex.schema.dropTable('production_crew_movies')
    await knex.schema.dropTable('movie_scenes')
    await knex.schema.dropTable('production_crew')
    await knex.schema.dropTable('production_crew_types')
    await knex.schema.dropTable('movie_sets')
    await knex.schema.dropTable('addresses')
    await knex.schema.dropTable('streets')
    await knex.schema.dropTable('locations')
    await knex.schema.dropTable('countries')
};

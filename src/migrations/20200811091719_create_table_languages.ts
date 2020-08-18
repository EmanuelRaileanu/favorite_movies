import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('languages', table => {
        table.increments('id').primary();
        table.string('language').unique();
    })
    await knex.schema.createTable('content_ratings', table => {
        table.increments('id').primary();
        table.string('rating').unique();
    })
    await knex.schema.table('movies', table => {
        table.integer('countryId').unsigned().references('id').inTable('countries');
        table.integer('contentRatingId').unsigned().references('id').inTable('content_ratings')
        table.string('awards');
    })
    await knex.schema.createTable('movies_languages', table => {
        table.integer('movieId').unsigned().references('id').inTable('movies');
        table.integer('languageId').unsigned().references('id').inTable('languages');
    })
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('movies_languages')
    await knex.schema.table('movies', table => {
        table.dropForeign(['countryId']);
        table.dropColumn('countryId');
        table.dropForeign(['contentRatingId']);
        table.dropColumn('contentRatingId');
        table.dropColumn('awards');
    })
    await knex.schema.dropTable('content_ratings')
    await knex.schema.dropTable('languages')
};

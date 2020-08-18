import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('actor_photos', table => {
        table.increments('id').primary();
        table.string('originalFileName');
        table.string('mimeType');
        table.string('relativePath');
        table.integer('size');
        table.string('fileName');
    })
    await knex.schema.createTable('actors', table => {
        table.increments('id').primary();
        table.string('firstName');
        table.string('lastName');
        table.integer('age');
        table.string('nationality');
        table.text('studies');
        table.text('awards');
        table.string('fbProfileLink');
        table.text('shortDescription');
        table.integer('recentPhotoId').unsigned().references('id').inTable('actor_photos');
    })
    await knex.schema.createTable('movies_actors', table => {
        table.integer('actorId').unsigned().references('id').inTable('actors');
        table.integer('movieId').unsigned().references('id').inTable('movies');
    })
    
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('movies_actors')
    await knex.schema.dropTable('actors')
    await knex.schema.dropTable('actor_photos')
};

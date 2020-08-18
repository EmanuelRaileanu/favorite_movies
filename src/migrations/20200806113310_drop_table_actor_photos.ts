import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('actors', table => {
        table.dropForeign(['recentPhotoId']);
        table.integer('recentPhotoId').unsigned().references('id').inTable('files').alter();
    })
    await knex.schema.dropTable('actor_photos')
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.createTable('actor_photos', table => {
        table.increments('id').primary();
        table.string('originalFileName');
        table.string('mimeType');
        table.string('relativePath');
        table.integer('size');
        table.string('fileName');
    })
    await knex.schema.table('actors', table => {
        table.dropForeign(['recentPhotoId']);
        table.integer('recentPhotoId').unsigned().references('id').inTable('actor_photos').alter();
    })
};

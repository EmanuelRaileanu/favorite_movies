import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('files', table => {
        table.increments('id').primary();
        table.string('originalFileName');
        table.string('mimeType');
        table.string('relativePath');
        table.integer('size');
        table.string('fileName');
    })
    await knex.schema.table('movies' , table => {
        table.integer('posterId').unique().unsigned().references('id').inTable('files');
    })
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('movies', table => {
        table.dropForeign(['posterId']);
        table.dropColumn('posterId');
    })
    await knex.schema.dropTable('files')
};

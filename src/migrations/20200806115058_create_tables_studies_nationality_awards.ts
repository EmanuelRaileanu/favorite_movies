import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('studies', table => {
        table.increments('id').primary();
        table.string('institution');
        table.string('degree');
        table.integer('graduationYear');
        table.integer('actorId').unsigned().references('id').inTable('actors');
    })
    await knex.schema.createTable('nationalities', table => {
        table.increments('id').primary();
        table.string('nationality').unique();
    })
    await knex.schema.createTable('awards', table => {
        table.increments('id');
        table.string('award');
        table.integer('year');
        table.string('movie');
        table.string('movieCharacter');
        table.integer('actorId').unsigned().references('id').inTable('actors');
    })
    await knex.schema.table('actors', table => {
        table.dropColumn('studies');
        table.dropColumn('nationality');
        table.dropColumn('awards');
        table.integer('nationalityId').unsigned().references('id').inTable('nationalities');
    })
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('actors', table => {
        table.text('studies');
        table.string('nationality');
        table.text('awards');
        table.dropForeign(['actorId']);
        table.dropColumn('actorId');
    })
    await knex.schema.dropTable('awards')
    await knex.schema.dropTable('nationalities')
    await knex.schema.dropTable('studies')
};

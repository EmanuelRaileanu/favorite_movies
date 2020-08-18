import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('movies', table => {
        table.unique(['title']);
    })
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('movies', table => {
        table.dropUnique(['title']);
    })
};

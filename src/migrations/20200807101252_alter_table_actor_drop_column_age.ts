import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('actors', table => {
        table.dropColumn('age');
        table.date('dateOfBirth');
    })
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('actors', table => {
        table.dropColumn('dateOfBirth');
        table.integer('age');
    })
};

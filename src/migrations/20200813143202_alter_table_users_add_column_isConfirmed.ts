import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('users', table => {
        table.boolean('isConfirmed').defaultTo(false);
    })
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('users', table => {
        table.dropColumn('isConfirmed');
    })
};

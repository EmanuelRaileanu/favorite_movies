import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('users', table => {
        table.string('refreshToken');
    })
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('users', table => {
        table.dropColumn('refreshToken');
    })
};

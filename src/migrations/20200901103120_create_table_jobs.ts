import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('jobs', table => {
        table.increments('id').primary().unique();
        table.string('status');
        table.string('type');
        table.string('email');
        table.string('token');
    });
};


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('jobs');
};


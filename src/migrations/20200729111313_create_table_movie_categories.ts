import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('movie_categories', table => {
        table.increments('id').primary();
        table.string('category');
    })
};
  
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('movie_categories');
};
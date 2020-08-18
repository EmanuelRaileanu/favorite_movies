import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('production_companies', table => {
    table.increments('id').primary();
    table.string('name');
    table.unique(['name']);
  });
};
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('production_companies');
};

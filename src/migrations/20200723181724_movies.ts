import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('movies', table => {
      table.increments('id').primary();
      table.string('title');
      table.text('description');
      table.string('runtime');
      table.string('budget');
      table.string('gross');
      table.decimal('overallRating', 2, 1);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
  };
  
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('movies');
};

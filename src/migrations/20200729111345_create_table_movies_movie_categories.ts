import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('movies_movie_categories', table => {
        table.integer('movieId').unsigned().references('id').inTable('movies');
        table.integer('categoryId').unsigned().references('id').inTable('movie_categories');
    })
};
  
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('movies_movie_categories');
};
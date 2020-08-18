import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('movies', table => {
      table.date('releaseDate');
      table.decimal('budget', 15, 2).alter();
      table.decimal('gross', 15, 2).alter(); 
    })
  };
  
export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('movies', table => {
        table.dropColumn('releaseDate');
        table.dropColumn('budget');
        table.dropColumn('gross');
    })
};

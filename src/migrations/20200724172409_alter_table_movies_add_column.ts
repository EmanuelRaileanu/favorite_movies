import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('movies', table => {
      table.integer('ProductionCompanyId').unsigned().notNullable().references('id').inTable('production_companies');
    })
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('movies', table => {
        table.dropForeign(['ProductionCompanyId']);
        table.dropColumn('ProductionCompanyId');
    })
};

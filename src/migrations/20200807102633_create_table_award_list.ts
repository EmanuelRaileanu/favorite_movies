import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('award_list', table => {
        table.increments('id').primary();
        table.string('awardName');
    })
    await knex.schema.table('awards', table => {
        table.dropColumn('award');
        table.integer('awardId').unsigned().references('id').inTable('award_list');
    })
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('awards', table => {
        table.dropForeign(['awardId']);
        table.dropColumn('awardId');
        table.string('award');
    })
};

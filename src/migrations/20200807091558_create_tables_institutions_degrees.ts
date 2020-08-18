import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('institutions', table => {
        table.increments('id').primary();
        table.string('institution');
    })
    await knex.schema.createTable('degrees', table => {
        table.increments('id').primary();
        table.string('degree');
    })
    await knex.schema.table('studies', table => {
        table.dropColumn('institution');
        table.dropColumn('degree');
        table.integer('institutionId').unsigned().references('id').inTable('institutions');
        table.integer('degreeId').unsigned().references('id').inTable('degrees');
    })
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('studies', table => {
        table.dropForeign(['degreeId']);
        table.dropColumn('degreeId');
        table.dropForeign(['institutionId']);
        table.dropColumn('institutionId');
        table.string('degree');
        table.string('institution');
    })
    await knex.schema.dropTable('degrees')
    await knex.schema.dropTable('institutions')
};

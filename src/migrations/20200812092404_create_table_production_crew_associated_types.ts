import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('production_crew', table => {
        table.dropForeign(['typeId']);
        table.dropColumn('typeId');
    })
    await knex.schema.createTable('production_crew_associated_types', table => {
        table.integer('productionCrewMemberId').unsigned().references('id').inTable('production_crew');
        table.integer('typeId').unsigned().references('id').inTable('production_crew_types');
    })
};

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('production_crew_associated_types')
    await knex.schema.table('production_crew', table => {
            table.integer('typeId').unsigned().references('id').inTable('production_crew_types');
    })
};

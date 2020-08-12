exports.up = function(knex) {
    return knex.schema.table('production_crew', table => {
        table.dropForeign('typeId');
        table.dropColumn('typeId');
    })
    .createTable('production_crew_associated_types', table => {
        table.integer('productionCrewMemberId').unsigned().references('id').inTable('production_crew');
        table.integer('typeId').unsigned().references('id').inTable('production_crew_types');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('production_crew_associated_types')
        .table('production_crew', table => {
            table.integer('typeId').unsigned().references('id').inTable('production_crew_types');
        })
};

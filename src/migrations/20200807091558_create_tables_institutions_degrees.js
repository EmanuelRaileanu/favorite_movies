exports.up = function(knex) {
    return knex.schema.createTable('institutions', table => {
        table.increments('id').primary();
        table.string('institution');
    })
    .createTable('degrees', table => {
        table.increments('id').primary();
        table.string('degree');
    })
    .table('studies', table => {
        table.dropColumn('institution');
        table.dropColumn('degree');
        table.integer('institutionId').unsigned().references('id').inTable('institutions');
        table.integer('degreeId').unsigned().references('id').inTable('degrees');
    })
};

exports.down = function(knex) {
    return knex.schema.table('studies', table => {
        table.dropForeign('degreeId');
        table.dropForeign('institutionId');
        table.string('degree');
        table.string('institution');
    })
    .dropTable('degrees')
    .dropTable('institutions')
};

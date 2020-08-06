exports.up = function(knex) {
    return knex.schema.createTable('studies', table => {
        table.increments('id').primary();
        table.string('institution');
        table.string('degree');
        table.integer('graduationYear');
        table.integer('actorId').unsigned().references('id').inTable('actors');
    })
    .createTable('nationalities', table => {
        table.increments('id').primary();
        table.string('nationality').unique();
    })
    .createTable('awards', table => {
        table.increments('id');
        table.string('award');
        table.integer('year');
        table.string('movie');
        table.string('movieCharacter');
        table.integer('actorId').unsigned().references('id').inTable('actors');
    })
    .table('actors', table => {
        table.dropColumn('studies');
        table.dropColumn('nationality');
        table.dropColumn('awards');
        table.integer('nationalityId').unsigned().references('id').inTable('nationalities');
    })
};

exports.down = function(knex) {
    return knex.schema.table('actors', table => {
        table.text('studies');
        table.string('nationality');
        table.text('awards');
        table.dropForeign('actorId');
    })
    .dropTable('awards')
    .dropTable('nationalities')
    .dropTable('studies')
};

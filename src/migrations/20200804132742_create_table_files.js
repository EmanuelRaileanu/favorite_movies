exports.up = function(knex) {
    return knex.schema.createTable('files', table => {
        table.increments('id').primary();
        table.string('originalFileName');
        table.string('mimeType');
        table.string('relativePath');
        table.integer('size');
        table.string('fileName');
    })
    .table('movies' , table => {
        table.integer('posterId').unique().unsigned().references('id').inTable('files');
    })
};

exports.down = function(knex) {
    return knex.schema.table('movies', table => {
        table.dropForeign('posterId')
    })
    .dropTable('files')
};

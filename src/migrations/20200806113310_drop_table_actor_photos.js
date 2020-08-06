exports.up = function(knex) {
    return knex.schema.table('actors', table => {
        table.dropForeign('recentPhotoId');
        table.integer('recentPhotoId').unsigned().references('id').inTable('files').alter();
    })
    .dropTable('actor_photos')
};

exports.down = function(knex) {
    return knex.schema.createTable('actor_photos', table => {
        table.increments('id').primary();
        table.string('originalFileName');
        table.string('mimeType');
        table.string('relativePath');
        table.integer('size');
        table.string('fileName');
    })
    .table('actors', table => {
        table.dropForeign('recentPhotoId');
        table.integer('recentPhotoId').unsigned().references('id').inTable('actor_photos').alter();
    })
};

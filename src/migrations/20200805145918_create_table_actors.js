
exports.up = function(knex) {
    return knex.schema.createTable('actor_photos', table => {
        table.increments('id').primary();
        table.string('originalFileName');
        table.string('mimeType');
        table.string('relativePath');
        table.integer('size');
        table.string('fileName');
    })
    .createTable('actors', table => {
        table.increments('id').primary();
        table.string('firstName');
        table.string('lastName');
        table.integer('age');
        table.string('nationality');
        table.text('studies');
        table.text('awards');
        table.string('fbProfileLink');
        table.text('shortDescription');
        table.integer('recentPhotoId').unsigned().references('id').inTable('actor_photos');
    })
    .createTable('movies_actors', table => {
        table.integer('actorId').unsigned().references('id').inTable('actors');
        table.integer('movieId').unsigned().references('id').inTable('movies');
    })
    
};

exports.down = function(knex) {
    return knex.schema.dropTable('movies_actors')
        .dropTable('actors')
        .dropTable('actor_photos')
};

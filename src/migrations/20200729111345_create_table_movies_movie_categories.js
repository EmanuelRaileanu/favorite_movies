exports.up = function(knex) {
    return knex.schema.createTable('movies_movie_categories', table => {
        table.integer('movieId').unsigned().references('id').inTable('movies');
        table.integer('categoryId').unsigned().references('id').inTable('movie_categories');
    })
};
  
exports.down = function(knex) {
    return knex.schema.dropTable('movies_movie_categories');
};
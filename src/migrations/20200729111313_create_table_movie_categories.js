exports.up = function(knex) {
    return knex.schema.createTable('movie_categories', table => {
        table.increments('id').primary();
        table.string('category');
    })
};
  
exports.down = function(knex) {
    return knex.schema.dropTable('movie_categories');
};
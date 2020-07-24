
exports.up = function(knex) {
  return knex.schema.table('movie_list', table => {
    table.date('releaseDate');
    table.decimal('budget', 15, 2).alter();
    table.decimal('gross', 15, 2).alter(); 
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('movie_list', table => {
        table.dropColumn('id');
        table.dropColumn('title');
        table.dropColumn('description');
        table.dropColumn('runtime');
        table.dropColumn('releaseDate');
        table.dropColumn('budget');
        table.dropColumn('gross');
        table.dropColumn('overallRating', 2, 1);
        table.dropTimestamps('createdAt');
        table.dropTimestamps('updatedAt');
    })
};

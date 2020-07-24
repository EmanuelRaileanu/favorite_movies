
exports.up = function(knex) {
  return knex.schema.table('movies', table => {
    table.date('releaseDate');
    table.decimal('budget', 15, 2).alter();
    table.decimal('gross', 15, 2).alter(); 
  })
};

exports.down = function(knex) {
    return knex.schema.alterTable('movies', table => {
        table.dropColumn('releaseDate');
        table.dropColumn('budget');
        table.dropColumn('gross');
    })
};

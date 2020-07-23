exports.up = function(knex) {
    return knex.schema.createTable('movie_list', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.text('description');
      table.string('runtime');
      table.date('releaseDate');
      table.string('budget');
      table.string('gross');
      table.decimal('overallRating', 2, 1);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('movie_list', () => {
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
    });
  };
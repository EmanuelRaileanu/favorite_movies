
exports.up = function(knex) {
  return knex.schema.createTable('production_companies', table => {
    table.increments('id').primary();
    table.string('name');
    table.unique('name');
  });
};
exports.down = function(knex) {
  return knex.schema.dropTable('production_companies');
};

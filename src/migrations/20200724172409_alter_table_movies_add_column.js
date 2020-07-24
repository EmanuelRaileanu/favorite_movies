
exports.up = function(knex) {
  return knex.schema.table('movies', table => {
      table.integer('ProductionCompanyId').unsigned().notNullable().references('id').inTable('production_companies');
  })
};

exports.down = function(knex) {
    return knex.schema.table('movies', table => {
        table.dropColumn('ProductionCompanyId');
    })
};

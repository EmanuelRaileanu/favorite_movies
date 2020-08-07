exports.up = function(knex) {
    return knex.schema.table('actors', table => {
        table.dropColumn('age');
        table.date('dateOfBirth');
    })
};

exports.down = function(knex) {
    return knex.schema.table('actors', table => {
        table.dropColumn('dateOfBirth');
        table.integer('age');
    })
};

exports.up = function(knex) {
    return knex.schema.table('users', table => {
        table.boolean('isConfirmed').defaultTo(false);
    })
};

exports.down = function(knex) {
    return knex.schema.table('users', table => {
        table.dropColumn('isConfirmed');
    })
};

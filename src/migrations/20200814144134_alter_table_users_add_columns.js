exports.up = function(knex) {
    return knex.schema.table('users', table => {
        table.string('refreshToken');
    })
};

exports.down = function(knex) {
    return knex.schema.table('users', table => {
        table.dropColumn('refreshToken');
    })
};

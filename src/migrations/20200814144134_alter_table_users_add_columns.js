exports.up = function(knex) {
    return knex.schema.table('users', table => {
        table.string('accessToken');
        table.string('refreshToken');
    })
};

exports.down = function(knex) {
    return knex.schema.table('users', table => {
        table.dropColumn('accessToken');
        table.dropColumn('refreshToken');
    })
};

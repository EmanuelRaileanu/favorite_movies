exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('email').unique();
        table.string('password');
        table.string('name');
        table.date('dateOfBirth');
        table.string('bearerToken');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};

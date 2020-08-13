exports.up = function(knex) {
    return knex.schema.table('users', table => {
        table.string('confirmationToken').unique();
        table.string('resetPasswordToken').unique();
    })
};

exports.down = function(knex) {
    return knex.schema.table('users', table => {
        table.dropColumn('confirmationToken');
        table.dropColumn('resetPasswordToken');
    })
};

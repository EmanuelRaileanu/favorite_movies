
exports.up = function(knex) {
    return knex.schema.table('movies', table => {
        table.unique('title');
    })
};

exports.down = function(knex) {
    return knex.schema.table('movies', table => {
        table.dropUnique('title');
    })
};

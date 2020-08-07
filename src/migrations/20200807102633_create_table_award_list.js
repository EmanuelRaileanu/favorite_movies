exports.up = function(knex) {
    return knex.schema.createTable('award_list', table => {
        table.increments('id').primary();
        table.string('awardName');
    })
    .table('awards', table => {
        table.dropColumn('award');
        table.integer('awardId').unsigned().references('id').inTable('award_list');
    })
};

exports.down = function(knex) {
    return knex.schema.table('awards', table => {
        table.dropForeign('awardId');
        table.dropColumn('awardId');
        table.string('award');
    })
};

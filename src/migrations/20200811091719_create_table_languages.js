exports.up = function(knex) {
    return knex.schema.createTable('languages', table => {
        table.increments('id').primary();
        table.string('language').unique();
    })
    .createTable('content_ratings', table => {
        table.increments('id').primary();
        table.string('rating').unique();
    })
    .table('movies', table => {
        table.integer('countryId').unsigned().references('id').inTable('countries');
        table.integer('contentRatingId').unsigned().references('id').inTable('content_ratings')
        table.string('awards');
    })
    .createTable('movies_languages', table => {
        table.integer('movieId').unsigned().references('id').inTable('movies');
        table.integer('languageId').unsigned().references('id').inTable('languages');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('movies_languages')
    .table('movies', table => {
        table.dropForeign('countryId');
        table.dropColumn('countryId');
        table.dropForeign('contentRatingId');
        table.dropColumn('contentRatingId');
        table.dropColumn('awards');
    })
    .dropTable('content_ratings')
    .dropTable('languages')
};

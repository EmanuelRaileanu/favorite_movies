import Knex from 'knex';
import Bookshelf from 'bookshelf';
const config = require('../../knexfile');

export const knex = Knex(config.development);

export const bookshelf = Bookshelf(knex);

bookshelf.plugin('bookshelf-virtuals-plugin');

import Knex from 'knex';
import * as config from '../../knexfile.js';
import Bookshelf from 'bookshelf';

export const knex = Knex(config.development);

export const bookshelf = Bookshelf(knex);

bookshelf.plugin('bookshelf-virtuals-plugin');

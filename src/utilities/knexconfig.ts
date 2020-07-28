import Knex from 'knex';
import * as config from '../../knexfile.js';

export const knex = Knex(config.development);
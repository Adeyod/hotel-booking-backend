import knex from 'knex';
import config from '../knexfile';

const environment = process.env.NODE_ENV || 'development';

const knexConfig = config[environment];

export const knexConnect = knex(knexConfig);

import type { Knex } from 'knex';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Update with your config settings.

console.log('host:', process.env.POSTGRES_HOST);

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      port: process.env.POSTGRES_PORT
        ? Number(process.env.POSTGRES_PORT)
        : undefined,
    },

    migrations: {
      directory: path.join(__dirname, './knex-db/migrations'),
      extension: 'ts',
    },

    seeds: {
      directory: path.join(__dirname, './knex-db/seeds'),
      extension: 'ts',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default config;

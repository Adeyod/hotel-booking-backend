import type { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('full_name').notNullable();
    table.string('email').unique().notNullable();
    table.text('password').notNullable();
    table.boolean('is_verified').defaultTo(false);
    table.string('phone_number');
    table.timestamps(true, true);
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return await knex.schema.dropTableIfExists('users');
};

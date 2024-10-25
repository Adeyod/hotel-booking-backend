import type { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return await knex.schema
    .createTable('verification_codes', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.string('token').notNullable();
      table.timestamp('expires_at').notNullable();
      table.string('purpose').notNullable();
      table.timestamps(true, true);
    })

    // price, availableDates
    .createTable('rooms', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('room_number').notNullable();
      table.string('room_type').notNullable();
      table.string('max_guest').notNullable();
    });
};

export const down = async (knex: Knex): Promise<void> => {
  return await knex.schema
    .dropTableIfExists('verification_codes')
    .dropTableIfExists('rooms');
};

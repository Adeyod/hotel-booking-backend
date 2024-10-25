import { table } from 'console';
import type { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.table('rooms', (table) => {
    table.string('price').notNullable();
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.table('rooms', (table) => {
    table.dropColumn('price');
  });
};

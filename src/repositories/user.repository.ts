import { NewUser, UserDocument } from '../constants/types';
import { knexConnect } from '../knex-db/knex';

const findUserByEmail = async (email: string) => {
  const user = await knexConnect('users').select('*').where('email', email);

  return user;
};

const newUserRegistration = async ({
  full_name,
  email,
  password,
  phone_number,
}: NewUser) => {
  const createUser = await knexConnect<UserDocument>('users')
    .insert({
      full_name,
      email,
      password,
      phone_number,
    })
    .returning('*');

  return createUser;
};

export { findUserByEmail, newUserRegistration };

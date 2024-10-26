import { knexConnect } from '../knex-db/knex';

type VerificationProp = {
  token: string;
  purpose: string;
  expires_at: string;
  user_id: string;
};

type VerificationQuery = VerificationProp & {
  id: string;
  created_at: string;
  updated_at: string;
};

const createVerificationCode = async ({
  token,
  purpose,
  expires_at,
  user_id,
}: VerificationProp) => {
  const result = await knexConnect<VerificationQuery>('verification_codes')
    .insert({
      token,
      purpose,
      expires_at,
      user_id,
    })
    .returning('*');

  return result;
};

export { createVerificationCode };

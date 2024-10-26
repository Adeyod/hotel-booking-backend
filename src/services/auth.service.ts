import { NewUser, User } from '../constants/types';
import {
  findUserByEmail,
  newUserRegistration,
} from '../repositories/user.repository';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { createVerificationCode } from '../repositories/verification.repository';
import { sendVerificationMail } from '../utils/nodemailer';

const TokenExpiration = (num: number) => {
  return new Date(Date.now() + num * 60 * 1000);
};

const userRegistration = async (payload: NewUser) => {
  const { full_name, email, password, phone_number } = payload;

  const userExist = await findUserByEmail(email);

  const user = userExist[0];

  if (user) {
    throw new Error(`User with email ${email} already exist`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await newUserRegistration({
    full_name,
    email,
    password: hashedPassword,
    phone_number,
  });

  const newUser = result[0];
  if (!newUser) {
    throw new Error('Unable to register user');
  }

  const { password: _password, ...others } = newUser;

  const token = uuidv4();

  const expires_at = TokenExpiration(20);

  const newVerificationToken = await createVerificationCode({
    token,
    purpose: 'email-verification',
    expires_at: expires_at.toISOString(),
    user_id: newUser.id,
  });

  const generatedToken = newVerificationToken[0];

  if (!generatedToken) {
    throw new Error('Unable to generate token');
  }

  const link = `${process.env.FRONTEND_URL}/email-verification?user_id=${newUser.id}&token=${generatedToken.token}`;

  const first_name = newUser.full_name.split(' ')[0];
  const userEmail = newUser.email;

  const sendEmail = await sendVerificationMail({
    link,
    first_name,
    userEmail,
  });

  return others;
};

export { userRegistration };

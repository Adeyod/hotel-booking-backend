import { NextFunction, Request, Response } from 'express';

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

type User = LoginProp & {
  full_name: string;

  confirm_password: string;
  phone_number: string;
};

type NewUser = Omit<User, 'confirm_password'>;

type EmailType = {
  link: string;
  first_name: string;
  userEmail: string;
};

type UserDocument = NewUser & {
  id: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
};

type LoginProp = {
  email: string;
  password: string;
};

type resetPasswordProp = {
  password: string;
  confirm_password: string;
};

type forgotPasswordProp = {
  email: string;
};

export {
  AsyncHandler,
  NewUser,
  forgotPasswordProp,
  resetPasswordProp,
  LoginProp,
  User,
  UserDocument,
  EmailType,
};

import Joi from 'joi';
import {
  forgotPasswordProp,
  LoginProp,
  resetPasswordProp,
  User,
} from '../constants/types';

const forbiddenCharsRegex = /^[^|!{}()&=[\]===><>]+$/;
const passwordRegex =
  /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,20}$/;
const phoneNumberPattern = /^[0-9+]{10,14}$/;

const joiValidation = <
  T extends User | resetPasswordProp | LoginProp | forgotPasswordProp
>(
  payload: T,
  validationType: 'register' | 'login' | 'reset-password' | 'forgot-password'
) => {
  let validationSchema;
  switch (validationType) {
    case 'register':
      validationSchema = Joi.object({
        full_name: Joi.string()
          .min(3)
          .required()
          .pattern(new RegExp(`^[^${forbiddenCharsRegex.source}]*$`))
          .messages({
            'string.min': 'Full name length must be at least 3 characters long',
            'string.empty': 'Full name must not be empty',
            'string.pattern.base': 'Invalid characters in full name field',
          }),

        email: Joi.string().email().required().messages({
          'string.empty': 'Email must not be empty',
          'string.email': 'Please provide a valid email address',
        }),
        password: Joi.string()
          .min(8)
          .max(32)
          .required()
          .pattern(passwordRegex)
          .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 3 characters long',
            'string.max': 'Password must be at most 32 characters long',
            'string.pattern.base':
              'Password must contain at least one lowercase, one uppercase, one special character',
          }),
        confirm_password: Joi.string()
          .valid(Joi.ref('password'))
          .required()
          .messages({
            'any.only': 'Password and confirm password do not match',
          }),
        phone_number: Joi.string()
          .pattern(phoneNumberPattern)
          .required()
          .messages({
            'string.empty': 'Phone number is required',
            'string.pattern.base': 'Please provide a valid phone number',
          }),
      });

      break;
    case 'login':
      validationSchema = Joi.object({
        email: Joi.string().email().required().messages({
          'string.empty': 'Email must not be empty',
          'string.email': 'Please provide a valid email address',
        }),
        password: Joi.string()
          .min(8)
          .max(32)
          .required()
          .pattern(passwordRegex)
          .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 3 characters long',
            'string.max': 'Password must be at most 32 characters long',
            'string.pattern.base':
              'Password must contain at least one lowercase, one uppercase, one special character',
          }),
      });
      break;

    case 'reset-password':
      validationSchema = Joi.object({
        password: Joi.string()
          .min(8)
          .max(32)
          .required()
          .pattern(passwordRegex)
          .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 3 characters long',
            'string.max': 'Password must be at most 32 characters long',
            'string.pattern.base':
              'Password must contain at least one lowercase, one uppercase, one special character',
          }),
        confirm_password: Joi.string()
          .valid(Joi.ref('password'))
          .required()
          .messages({
            'any.only': 'Password and confirm password do not match',
          }),
      });
      break;

    case 'forgot-password':
      validationSchema = Joi.object({
        email: Joi.string().email().required().messages({
          'string.empty': 'Email must not be empty',
          'string.email': 'Please provide a valid email address',
        }),
      });

      break;

    default:
      throw new Error('Invalid validation type');
  }

  const { error, value } = validationSchema.validate(payload);

  if (error) {
    throw new Error('Error validating payload');
  }

  return { success: true, value: value as T };
};

export { joiValidation };

import { userRegistration } from '../services/auth.service';
import catchErrors from '../utils/tryCatch';
import { joiValidation } from '../utils/validation';

const registerUser = catchErrors(async (req, res) => {
  const { full_name, email, password, confirm_password, phone_number } =
    req.body;

  const payload = {
    full_name,
    email,
    password,
    confirm_password,
    phone_number,
  };

  const response = joiValidation(payload, 'register');

  const userService = await userRegistration(response.value);

  return res.status(200).json({
    success: true,
    message: `${
      userService.full_name.split(' ')[0]
    }, your registration is successful. Please visit your email for email verification`,
  });
});

export { registerUser };

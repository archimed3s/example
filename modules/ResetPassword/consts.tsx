import * as yup from 'yup';

export const ResetPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

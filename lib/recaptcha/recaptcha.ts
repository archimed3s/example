import axios from 'axios';

export const verifyCaptcha = async (captcha: string) => {
  const { data } = await axios.post<{ success: boolean }>(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
  );

  return data.success;
};

import * as t from 'io-ts';

export const contactUsRequest = t.strict({
  email: t.string,
  name: t.string,
  reason: t.string,
  message: t.string,
  recaptchaValue: t.string,
});
export type ContactUsRequest = t.TypeOf<typeof contactUsRequest> & { files: File[] }; // io-ts don't have file type

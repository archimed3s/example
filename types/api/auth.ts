import * as t from 'io-ts';

export const signupRequest = t.intersection([
  t.strict({
    email: t.string,
    password: t.string,
    currency: t.string,
    displayName: t.string,
    genderId: t.string,
    dateOfBirth: t.string,
  }),
  t.partial({
    firstName: t.string,
    lastName: t.string,
    countryId: t.string,
  }),
]);

export type SignupRequest = t.TypeOf<typeof signupRequest>;

export type SignupResponse = {
  token: string;
};

export type ConfirmTokenResponse = {
  email: string;
};

export const loginRequest = t.strict({
  email: t.string,
  password: t.string,
});
export type LoginRequest = t.TypeOf<typeof loginRequest>;

export const resetPasswordRequest = t.strict({
  email: t.string,
});
export type ResetPasswordRequest = t.TypeOf<typeof resetPasswordRequest>;

export type ResetPasswordResponse = {
  token: string;
  email: string;
};

export const changePasswordRequest = t.strict({
  newPassword: t.string,
  token: t.string,
});
export type ChangePasswordRequest = t.TypeOf<typeof changePasswordRequest>;

export type ChangePasswordResponse = {
  playerId: number;
};

export const checkInSignUpRequest = t.intersection([
  t.strict({
    acceptEmailsOffer: t.boolean,
    acceptPrivacy: t.boolean,
    acceptSmsOffer: t.boolean,
    acceptTermsConditions: t.boolean,
    address: t.string,
    birthdate: t.string,
    city: t.string,
    country: t.string,
    currency: t.string,
    email: t.string,
    firstName: t.string,
    lastName: t.string,
    password: t.string,
    phoneNumber: t.string,
    phonePrefix: t.string,
    genderId: t.string,
    postalCode: t.string,
    displayName: t.string,
  }),
  t.partial({
    provinceCode: t.union([t.string, t.null]),
    provinceName: t.union([t.string, t.null]),
  }),
]);
export type CheckInSignUpRequest = t.TypeOf<typeof checkInSignUpRequest>;

export const checkinValidateRequest = t.partial({
  email: t.string,
  currency: t.string,
  displayName: t.string,
  country: t.string,
});
export type CheckinValidateRequest = t.TypeOf<typeof checkinValidateRequest>;

import { Player } from '@sharedTypes/Player';
import { Auth } from '@sharedTypes/api';
import { get, post } from '@utils/fetcher';

const baseUrl = '/api';

export const loginUser = ({ email, password }: Auth.LoginRequest) =>
  post<Player>(`${baseUrl}/auth/login`, { email, password });

export const signUpCheckIn = (body: Auth.CheckInSignUpRequest) => post<Player>(`${baseUrl}/auth/checkin/signup`, body);
export const validateCheckin = (body: Auth.CheckinValidateRequest) => post(`${baseUrl}/auth/checkin/validate`, body);

export const logoutUser = () => post<void>(`${baseUrl}/auth/logout`);

export const registerUser = (body: Auth.SignupRequest) => post<Auth.SignupResponse>(`${baseUrl}/auth/signup`, body);

export const confirmToken = (token: string) => post<Auth.ConfirmTokenResponse>(`${baseUrl}/auth/confirmToken/${token}`);

export const resetUserPassword = ({ email }: Auth.ResetPasswordRequest) =>
  post<Auth.ResetPasswordResponse>(`${baseUrl}/auth/resetPassword`, {
    email,
  });

export const changePlayerPassword = ({ newPassword, token }: Auth.ChangePasswordRequest) =>
  post<Auth.ChangePasswordResponse>(`${baseUrl}/auth/changePassword`, {
    newPassword,
    token,
  });

export const fetchMe = () => get<Player>(`${baseUrl}/auth/me`);

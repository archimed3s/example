import { LoginPage } from '@modules/LoginPage/LoginPage';

import { AuthLayout } from '../layouts/AuthLayout';

const SignIn = () => {
  return <LoginPage />;
};

SignIn.layout = AuthLayout;

export default SignIn;

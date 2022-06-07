import { fetchPasswordSettings } from '@api/bff/fetchPasswordSettings';
import { PasswordRulesType } from '@common/validators/constants';
import { SignUpForm } from '@modules/SignUpForm/SignUpForm';

import { AuthLayout } from '../layouts/AuthLayout';

type SignUpProps = {
  passwordRules: PasswordRulesType;
};

const SignUp = ({ passwordRules }: SignUpProps) => {
  return <SignUpForm passwordRules={passwordRules} />;
};

export const getServerSideProps = async () => {
  const passwordRules = await fetchPasswordSettings();

  return {
    props: { passwordRules },
  };
};

SignUp.layout = AuthLayout;

export default SignUp;

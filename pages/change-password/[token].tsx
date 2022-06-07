import { fetchPasswordSettings } from '@api/bff/fetchPasswordSettings';
import { PasswordRulesType } from '@common/validators/constants';
import { ChangePasswordForm } from '@modules/ResetPassword/ChangePasswordForm';

type ChangePasswordProps = {
  passwordRules: PasswordRulesType;
};

const ChangePassword = ({ passwordRules }: ChangePasswordProps) => {
  return <ChangePasswordForm passwordRules={passwordRules} />;
};

export const getServerSideProps = async () => {
  const passwordRules = await fetchPasswordSettings();

  return {
    props: { passwordRules },
  };
};

export default ChangePassword;

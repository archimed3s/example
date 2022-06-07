import { PASSWORD_DEFAULT_RULES } from '@common/validators/constants';
import { getSiteId } from '@utils/api-utils';

export const fetchPasswordSettings = async () => {
  try {
    const site: any = { where: { id: getSiteId() } };

    if (!site?.password_rule_min_length) {
      return PASSWORD_DEFAULT_RULES;
    } else {
      return {
        min: site.password_rule_min_length,
        max: site.password_rule_max_length,
        numbers: site.password_rule_min_numeric_count,
        upper: site.password_rule_min_uppercase_count,
      };
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return PASSWORD_DEFAULT_RULES;
  }
};

import { useIntl } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';

type CodesMap = { ['default']: MessageDescriptor; [key: string]: MessageDescriptor };

export const useErrorMessageByCode = (codesMap: CodesMap) => {
  const intl = useIntl();

  const createErrorText = (code: string) => intl.formatMessage(codesMap[code] || codesMap.default);

  return { createErrorText };
};

import { useIntl } from 'react-intl';

import { PhoneNumberProviderDeposit } from '../_PhoneNumberProviderDeposit';
import { PaymentPageProps } from '../types';
import { messages } from './translations';

export const AstroPayDeposit = (props: PaymentPageProps) => {
  const { formatMessage } = useIntl();

  return (
    <PhoneNumberProviderDeposit
      messages={{
        title: formatMessage(messages.title),
        titleDeposit: formatMessage(messages.titleDeposit),
        phoneNumber: formatMessage(messages.phoneNumber),
        continue: formatMessage(messages.continue),
        errorFormat: formatMessage(messages.errorFormat),
        errorRequired: formatMessage(messages.errorRequired),
      }}
      onClose={props.onClose}
    />
  );
};

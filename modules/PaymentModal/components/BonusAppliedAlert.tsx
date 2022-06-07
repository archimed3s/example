import { Alert, AlertProps } from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  disclaimer: {
    id: 'PaymentModal.BonusAppliedAlert.disclaimer',
    defaultMessage: 'Caution, you have an active bonus! Placing a deposit will contribute towards the bonus wagering',
  },
});

export const BonusAppliedAlert = (props: AlertProps) => (
  <Alert status="success" marginTop={10} bgColor="nephrite.10" color="greenBright.100" borderRadius={8} {...props}>
    <FormattedMessage {...messages.disclaimer} />
  </Alert>
);

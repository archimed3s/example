import { Image } from '@chakra-ui/react';
import { defineMessages, useIntl } from 'react-intl';

import { CashierPaymentMethods } from '@modules/PlayerAccountPage/components/CashierPaymentMethods';
import { CashierPlayerBalance } from '@modules/PlayerAccountPage/components/CashierPlayerBalance';
import { LastTransactions } from '@modules/PlayerAccountPage/components/LastTransactions';

import { CashierLayout } from '../../layouts/CashierLayout';
import cashierIcon from './static/cashierIcon.png';

const messages = defineMessages({
  pageTitle: {
    id: 'CashierPage.pageTitle',
    defaultMessage: 'Cashier',
  },
  backToProfile: {
    id: 'User.backToProfile',
    defaultMessage: 'Back to profile',
  },
});

export const PlayerCashierPage = () => {
  const intl = useIntl();

  return (
    <>
      <CashierLayout
        title={intl.formatMessage(messages.pageTitle)}
        titleImage={<Image height="46px" width="46px" src={cashierIcon.src} alt="Cashier" />}
        mainContent={
          <>
            <CashierPlayerBalance />
            <CashierPaymentMethods />
          </>
        }
        sidebarContent={<LastTransactions />}
      />
    </>
  );
};

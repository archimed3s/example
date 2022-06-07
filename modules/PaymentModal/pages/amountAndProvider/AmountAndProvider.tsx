import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { usePaymentContext } from '@hooks/usePaymentContext';
import { useSiteSettings } from '@hooks/useSiteSettings';
import { BonusAppliedAlert } from '@modules/PaymentModal/components/BonusAppliedAlert';

import { AmountInput, Layout } from '../../components';
import { useAmountValidator } from '../../utils/useAmountValidator';
import { PaymentPageProps } from '../types';
import { FilterableProviders } from './FilterableProviders';
import { PredefinedAmounts } from './PredefinedAmounts';
import { ProviderLimits } from './ProviderLimits';

const messages = defineMessages({
  titleWithdraw: {
    id: 'PaymentModal.AmountAndProvider.titleWithdraw',
    defaultMessage: 'Withdraw',
  },
  titleDeposit: {
    id: 'PaymentModal.AmountAndProvider.titleDeposit',
    defaultMessage: 'Deposit',
  },
  continue: {
    id: 'Withdraw.continue',
    defaultMessage: 'Continue',
  },
});

const PREDEFINED_AMOUNTS = [10, 25, 50, 100, 250];

export const AmountAndProvider = ({ onSubmit, onClose, providers }: PaymentPageProps) => {
  const { formatMessage } = useIntl();
  const {
    state: { flow, limits, paymentProvider, amount, currency, bonusId },
    actions: { setProvider },
  } = usePaymentContext();
  const siteSettings = useSiteSettings();

  const providerLimits = useMemo(
    () => limits.find((limit) => limit.paymentProviderId === paymentProvider),
    [limits, paymentProvider],
  );

  const amountValidator = useAmountValidator(limits, currency, paymentProvider);
  const { isInvalidAmount } = amountValidator(amount);

  return (
    <Layout
      title={formatMessage(flow === 'deposit' ? messages.titleDeposit : messages.titleWithdraw)}
      onClose={onClose}
      button={{
        type: 'submit',
        disabled: !paymentProvider || isInvalidAmount || Number.isNaN(amount),
        children: formatMessage(messages.continue),
      }}
      onClick={onSubmit}
    >
      <Box
        as="form"
        flex="1 1 0"
        onSubmit={onSubmit}
        display="grid"
        gridTemplateRows="auto auto auto auto minmax(0, 1fr) auto"
        minHeight="0"
        width="100%"
      >
        <AmountInput />
        <PredefinedAmounts amounts={PREDEFINED_AMOUNTS} />
        <FilterableProviders
          selectedProvider={paymentProvider}
          categories={siteSettings?.paymentProviderCategory ?? {}}
          providers={providers ?? []}
          limits={limits}
          onChange={setProvider}
        />
        {providerLimits && <ProviderLimits minAmount={providerLimits.minAmount} maxAmount={providerLimits.maxAmount} />}
        {bonusId && <BonusAppliedAlert />}
      </Box>
    </Layout>
  );
};

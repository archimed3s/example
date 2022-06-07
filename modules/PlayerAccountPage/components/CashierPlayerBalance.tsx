import { Button, CSSObject, Grid, HStack, StackDivider, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { useMemo } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { DEPOSIT_PERMISSION, WITHDRAW_PERMISSION } from '@common/consts';
import { useCurrency } from '@hooks/useCurrency';
import { usePaymentModal } from '@hooks/usePaymentContext';
import { usePlayerState } from '@hooks/usePlayerState';

const messages = defineMessages({
  withdrawButton: {
    id: 'User.withdrawButton',
    defaultMessage: 'Withdraw',
  },
  depositButton: {
    id: 'User.depositButton',
    defaultMessage: 'Deposit',
  },
  realBalance: {
    id: 'User.realBalance',
    defaultMessage: 'Real',
  },
  bonusBalance: {
    id: 'User.bonusBalance',
    defaultMessage: 'Bonus',
  },
});

const BalanceDivider = <StackDivider borderColor="gray.0" alignSelf="initial" height={{ base: '12px', md: '6px' }} />;

type Styles = {
  container: CSSObject;
  icon: { size: number };
  totalAmount: CSSObject;
};

const breakPointStyles: Record<string, Styles> = {
  base: {
    container: {
      background:
        'radial-gradient(124.46% 66.52% at 50.15% 76.52%, rgba(0, 162, 100, 0.2) 0%, rgba(25, 29, 44, 0) 100%)',
      backgroundColor: 'gray.-120',
    },
    icon: {
      size: 6,
    },
    totalAmount: {
      textStyle: 'lg',
    },
  },
  md: {
    container: {
      gridTemplateColumns: '1fr 220px',
      background:
        'radial-gradient(25.24% 146.19% at 85.9% 19.29%, rgba(0, 162, 100, 0.3) 0%, rgba(25, 29, 44, 0) 100%)',
      backgroundColor: 'gray.-120',
    },
    icon: {
      size: 8,
    },
    totalAmount: {
      textStyle: 'lg2',
    },
  },
};

export const CashierPlayerBalance = () => {
  const { getCurrencyFormatted } = useCurrency();
  const { openDeposit, openWithdraw } = usePaymentModal();
  const { balance, player } = usePlayerState();

  const styles = useBreakpointValue<Styles>(breakPointStyles, 'base');
  const { depositDisabled, withdrawDisabled } = useMemo(
    () => ({
      depositDisabled: !player?.playerPermissions.includes(DEPOSIT_PERMISSION),
      withdrawDisabled: !player?.playerPermissions.includes(WITHDRAW_PERMISSION),
    }),
    [player],
  );

  return (
    <Grid sx={styles?.container} gridRowGap={5} width="100%" py={5} pr={6} pl={8} borderRadius={16}>
      <VStack alignItems="flex-start" justifyContent="center">
        <HStack justifyContent="flex-start">
          <Text sx={styles?.totalAmount}>{balance?.totalAmount && getCurrencyFormatted(+balance.totalAmount)}</Text>
        </HStack>
        <HStack justifyContent="flex-start" spacing="16px" divider={BalanceDivider}>
          <HStack>
            <Text color="gray.100">
              <FormattedMessage {...messages.realBalance} />
            </Text>
            <Text textStyle="s2">
              {balance?.withdrawableAmount && getCurrencyFormatted(+balance.withdrawableAmount)}
            </Text>
          </HStack>
          <HStack>
            <Text color="gray.100">
              <FormattedMessage {...messages.bonusBalance} />
            </Text>
            <Text textStyle="s2">{balance?.totalBonusAmount && getCurrencyFormatted(+balance.totalBonusAmount)}</Text>
          </HStack>
        </HStack>
      </VStack>
      <Grid rowGap={3}>
        <Button variant="payment" onClick={openDeposit} disabled={depositDisabled}>
          <FormattedMessage {...messages.depositButton} />
        </Button>
        <Button variant="alternate" onClick={openWithdraw} disabled={withdrawDisabled}>
          <FormattedMessage {...messages.withdrawButton} />
        </Button>
      </Grid>
    </Grid>
  );
};

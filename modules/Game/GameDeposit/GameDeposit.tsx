import { Flex, Grid, StackProps, Text } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { Button } from '@components/Button/Button';
import { DepositInput } from '@components/DepositInput';
import { PaymentModalPage, usePaymentModal } from '@hooks/usePaymentContext';
import { usePlayerState } from '@hooks/usePlayerState';

const messages = defineMessages({
  depositBtn: {
    id: 'GamePage.depositButton',
    defaultMessage: 'Deposit',
  },
});

type GamePlayerBalanceProps = {
  width?: StackProps['width'];
};

export const GameDeposit = ({ width }: GamePlayerBalanceProps) => {
  const { formatNumber } = useIntl();
  const [amount, setAmount] = useState(0);
  const { player } = usePlayerState();
  const { openDepositWithProps } = usePaymentModal();

  const onAmountChanged = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setAmount(Number(event.target.value)),
    [],
  );
  const onDeposit = useCallback(
    () =>
      openDepositWithProps({
        amount,
        page: PaymentModalPage.AMOUNT_AND_PROVIDER,
      }),
    [amount, openDepositWithProps],
  );
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        openDepositWithProps({ amount, page: PaymentModalPage.AMOUNT_AND_PROVIDER });
      }
    },
    [amount, openDepositWithProps],
  );

  return (
    <Grid direction="row" gap=".5rem" width={width} templateColumns={{ base: '1fr 1fr', md: 'auto auto' }}>
      <DepositInput
        textAlign="center"
        data-testid="game-amount-field"
        placeholder={formatNumber(0, { minimumFractionDigits: 2, minimumIntegerDigits: 2 })}
        onChange={onAmountChanged}
        paddingLeft="5rem"
        paddingRight="1rem"
        onKeyDown={onKeyDown}
        height="2.75rem"
        leftElement={
          <Flex direction="row" height="full" alignItems="center">
            <Text marginLeft=".5rem" color="white">
              {player?.currency}
            </Text>
          </Flex>
        }
      />
      <Button variant="payment" onClick={onDeposit} minWidth="6.125rem">
        <FormattedMessage {...messages.depositBtn} />
      </Button>
    </Grid>
  );
};

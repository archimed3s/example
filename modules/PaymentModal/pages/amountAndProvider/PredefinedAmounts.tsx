import { Box, HStack } from '@chakra-ui/react';

import { Button } from '@components/Button/Button';
import { useCurrency } from '@hooks/useCurrency';
import { usePaymentContext } from '@hooks/usePaymentContext';
import { usePlayerState } from '@hooks/usePlayerState';

type PredefinedAmountsProps = {
  amounts: number[];
};
export const PredefinedAmounts = ({ amounts }: PredefinedAmountsProps) => {
  const { balance } = usePlayerState();
  const {
    state: { currency, flow },
    actions: { setAmount },
  } = usePaymentContext();
  const { getCurrencyFormatted } = useCurrency({ currency });

  return (
    <Box overflow="hidden" width="100%">
      <HStack spacing={5} align="center" paddingY={2} paddingX={1} width="full" overflowX="hidden">
        {amounts.map((amount) => (
          <Button
            key={amount}
            variant="outline"
            disabled={flow === 'withdraw' && (balance?.withdrawableAmount ?? 0) < amount}
            onClick={() => setAmount(amount)}
          >
            {getCurrencyFormatted(amount)}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

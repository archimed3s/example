import { Skeleton, Tag, TagProps } from '@chakra-ui/react';

import { useCurrency } from '@hooks/useCurrency';
import { usePlayerState } from '@hooks/usePlayerState';

const BalanceTag = (props: TagProps) => (
  <Tag
    color="white"
    size="md"
    height="44px"
    paddingX={5}
    background="gray.-100"
    justifyContent="space-around"
    {...props}
  />
);

export const GameUserBalanceTag = (props: TagProps) => {
  const { getCurrencyFormatted } = useCurrency();
  const { balance } = usePlayerState();

  return (
    <Skeleton as={BalanceTag} isLoaded={!!balance} {...props}>
      {balance ? getCurrencyFormatted(+balance.totalAmount) : '——'}
    </Skeleton>
  );
};

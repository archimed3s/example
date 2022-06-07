import { BoxProps, Skeleton, Stack, useBreakpointValue } from '@chakra-ui/react';
import { useMemo } from 'react';

type CardsListProps = Pick<BoxProps, 'gridColumn'>;

export const CardsList = ({ gridColumn }: CardsListProps) => {
  const cardsCount = useBreakpointValue({ base: 3, md: 2, xl: 3 });
  const cards = useMemo(
    () =>
      Array.from(Array(cardsCount)).map((_, index) => (
        <Skeleton
          borderRadius={8}
          height={{ base: '258px', md: '296px' }}
          key={index}
          width={{ base: 'full', md: '50%', xl: '33%' }}
        />
      )),
    [cardsCount],
  );

  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing={4} gridColumn={gridColumn} marginBottom={12}>
      {cards}
    </Stack>
  );
};

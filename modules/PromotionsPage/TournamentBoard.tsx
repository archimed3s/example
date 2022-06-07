import { BoxProps, Skeleton } from '@chakra-ui/react';

type TournamentBoardProps = Pick<BoxProps, 'gridArea' | 'gridColumn'>;

export const TournamentBoard = ({ ...containerProps }: TournamentBoardProps) => {
  return <Skeleton borderRadius={8} minHeight={{ base: '400px' }} {...containerProps} />;
};

import { Grid, GridItem } from '@chakra-ui/react';

import { GameStatistics } from '@modules/Game/GameStatistics/GameStatistics';

type GameInformationProps = {
  gameId: string | undefined;
};

export const GameInformation = ({ gameId }: GameInformationProps) => {
  return (
    <Grid
      gridTemplateRows={{ base: 'repeat(4, auto)', md: 'repeat(4, auto)' }}
      gridTemplateColumns={{ base: 'auto', md: '1fr 1.5fr' }}
      gridColumnGap={{ base: '0', md: '48px' }}
      gridRowGap={{ base: '24px', md: '0' }}
    >
      <GridItem gridArea={{ base: '1 / 1 / auto / auto', md: '1 / 1 / auto / 1' }}>
        <GameStatistics gameId={gameId} />
      </GridItem>
      <GridItem gridArea={{ base: '2 / 1 / auto / auto', md: '1 / 2 / auto / 2' }}>
        {/* In this place should be a game description. */}
      </GridItem>
    </Grid>
  );
};

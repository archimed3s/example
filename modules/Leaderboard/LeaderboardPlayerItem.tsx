import { Box, Flex, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FC } from 'react';

import { Avatar } from '@components/Avatar/Avatar';
import { LeaderboardItem } from '@sharedTypes/Game';

type LeaderboardPlayerItemProps = {
  isAuthPlayer?: boolean;
  player: LeaderboardItem;
};

const StyledBox = styled(Box)`
  &:nth-of-type(1) .player-name::after {
    content: '🥇';
  }
  &:nth-of-type(2) .player-name::after {
    content: '🥈';
  }
  &:nth-of-type(3) .player-name::after {
    content: '🥉';
  }
`;

const styleProps = {
  authPlayerContainer: {
    background: 'radial-gradient(1924.29% 1766.86% at 97.88% -76.61%, #252C45 0%, #151927 100%)',
    px: 3,
    py: 2,
    roundedBottom: 'lg',
  },
  playerName: {
    color: 'white',
  },
  playerUsername: {
    textStyle: 'xs2',
  },
};

export const LeaderboardPlayerItem: FC<LeaderboardPlayerItemProps> = ({ isAuthPlayer = false, player }) => (
  <StyledBox {...(isAuthPlayer ? styleProps.authPlayerContainer : { my: 4 })}>
    <Flex alignItems={'center'}>
      <HStack spacing={3}>
        <Text {...styleProps.playerName} width={'30px'} isTruncated>
          {player.position}
        </Text>
        <Avatar {...{ name: player.name, src: player.avatarSrc, size: 'md', variant: 'circle' }} />
        <VStack spacing={0} alignItems={'flex-start'}>
          <Text {...styleProps.playerName} maxWidth={'300px'} className={isAuthPlayer ? '' : 'player-name'} isTruncated>
            {player.name} {isAuthPlayer ? '(Me)' : ''}
          </Text>
          <Text {...styleProps.playerUsername} maxWidth={'300px'} isTruncated>
            {player.username}
          </Text>
        </VStack>
      </HStack>
      <Spacer />
      <Text {...styleProps.playerName} fontWeight={600} ml={3}>
        €{player.prize}
      </Text>
    </Flex>
  </StyledBox>
);

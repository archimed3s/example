import {
  BadgeProps,
  Heading,
  HeadingProps,
  Image,
  ImageProps,
  Skeleton,
  Stack,
  StackProps,
  Text,
  TextProps,
} from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { Badge } from '@components/Badge/Badge';
import { GameDetails } from '@sharedTypes/api/game';

const messages = defineMessages({
  newGameBadge: {
    id: 'GameHeading.newGameBadge',
    defaultMessage: 'New',
  },
});

const thumbnailBox = '60px';

const GameCardWrapper = (props: StackProps) => <Stack direction="row" spacing={4} {...props} />;
const GameCardImage = (props: ImageProps) => (
  <Image
    boxSize={thumbnailBox}
    objectFit="cover"
    borderRadius={8}
    fallback={<Skeleton boxSize={thumbnailBox} />}
    {...props}
  />
);
const GameCardContent = (props: StackProps) => <Stack spacing={1} {...props} />;
const GameCardName = (props: HeadingProps) => <Heading as="h2" size="md" color="white" {...props} />;
const GameCardProvider = (props: TextProps) => <Text textTransform="capitalize" {...props} />;
const GameCardBadge = (props: BadgeProps) => <Badge {...props} />;

type Props = {
  gameDetails?: GameDetails;
};

export const GameCard = (props: Props) => {
  const isLoaded = !!props.gameDetails;

  return (
    <GameCardWrapper>
      <Skeleton boxSize={thumbnailBox} isLoaded={isLoaded}>
        {props.gameDetails ? <GameCardImage src={props.gameDetails.thumbnailUrl} alt={props.gameDetails.name} /> : null}
      </Skeleton>
      <GameCardContent>
        <GameCardName>
          <Skeleton as="span" isLoaded={isLoaded}>
            {props.gameDetails?.name ?? 'Game is loading'}{' '}
            {props.gameDetails?.isNew ? (
              <GameCardBadge>
                <FormattedMessage {...messages.newGameBadge} />
              </GameCardBadge>
            ) : null}
          </Skeleton>
        </GameCardName>
        <GameCardProvider>
          <Skeleton as="span" isLoaded={isLoaded}>
            {props.gameDetails?.providerHandle ?? 'Provider'}
          </Skeleton>
        </GameCardProvider>
      </GameCardContent>
    </GameCardWrapper>
  );
};

import { Box, Button, ButtonGroup, Flex, Image, Skeleton, chakra } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

type GameThumbnailProps = {
  image?: string;
  dataTestId?: string;
  buttonsPrimaryTitle: string;
  buttonsPrimaryLink: string;
  buttonsSecondaryTitle: string;
  buttonsSecondaryLink: string;
};

const cardBorderRadius = '2xl';

const styleProps = {
  cardBackground: {
    rounded: cardBorderRadius,
    bgPosition: '50%',
    top: '0',
    left: '0',
    w: 'full',
    h: 'full',
  },
  buttonsContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    bottom: '2',
    left: '0',
    w: '100%',
    p: '2.5',
    opacity: '0',
    _groupHover: {
      bottom: '0',
      opacity: '1',
    },
  },
};

export const GameCard = chakra(Box, {
  baseStyle: {
    position: 'relative',
    width: '10.4375rem',
    height: '15.25rem',
    transition: 'transform 0.2s ease-in-out',
    _hover: {
      transform: 'scale(1.1)',
    },
  },
});

export const GameSkeleton = chakra(Skeleton, {
  baseStyle: {
    w: 'full',
    h: 'full',
    rounded: cardBorderRadius,
  },
});

export const GameThumbnail: FC<GameThumbnailProps> = ({
  image,
  dataTestId,
  buttonsPrimaryTitle,
  buttonsPrimaryLink,
  buttonsSecondaryTitle,
  buttonsSecondaryLink,
}) => (
  <GameCard role="group" data-testid={dataTestId}>
    <Image alt="" objectFit="cover" position="absolute" src={image} {...styleProps.cardBackground} />
    <Flex position="absolute" {...styleProps.buttonsContainer}>
      <ButtonGroup isAttached>
        <Link href={buttonsPrimaryLink} passHref={true}>
          <Button variant="blur" minW="4.25rem" as="a">
            {buttonsPrimaryTitle}
          </Button>
        </Link>
        <Link href={buttonsSecondaryLink} passHref={true}>
          <Button variant="payment" minW="4.25rem" as="a" href={buttonsSecondaryLink}>
            {buttonsSecondaryTitle}
          </Button>
        </Link>
      </ButtonGroup>
    </Flex>
  </GameCard>
);

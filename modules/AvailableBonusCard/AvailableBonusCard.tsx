import { Box, BoxProps, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { Button } from '@components/Button/Button';
import { GLink } from '@components/GLink/GLink';

import imgCup from './static/cup.png';

export type VariantKey = 'available' | 'locked' | 'claimed' | 'cancel';

export type AvailableBonusCardProps = BoxProps & {
  id: string;
  caption: string;
  title: string;
  code: string;
  text: string;
  claimURL?: string;
  cancelURL?: string;
  linkText: string;
  linkURL: string;
  variant: VariantKey;
};

const messages = defineMessages({
  useCode: {
    id: 'AvailableBonusCard.useCode',
    defaultMessage: 'Use code:',
  },
  claimNow: {
    id: 'AvailableBonusCard.claimNow',
    defaultMessage: 'Claim Now',
  },
  cancelBonus: {
    id: 'AvailableBonusCard.cancelBonus',
    defaultMessage: 'Cancel Bonus',
  },
  locked: {
    id: 'AvailableBonusCard.locked',
    defaultMessage: 'Locked',
  },
  claimed: {
    id: 'AvailableBonusCard.claimed',
    defaultMessage: 'Claimed',
  },
});

const variants = {
  available: {
    card: {
      bg: 'radial-gradient(61.52% 38.69% at 50% 70.12%, rgba(107, 0, 255, 0.2) 0%, rgba(107, 0, 255, 0) 100%), linear-gradient(0deg, rgba(132, 69, 218, 0.1), rgba(132, 69, 218, 0.1)), #191D2C;',
    },
    supTitle: { color: '#BA94EF' },
    link: { color: 'gray.120' },
    useCode: { color: 'white' },
    code: { color: 'primary.10' },
    subText: { textDecoration: 'none' },
  },
  locked: {
    card: { bg: 'gray.-120' },
    supTitle: { color: 'gray.160' },
    link: { color: 'gray.120' },
    useCode: { color: 'white' },
    code: { color: 'gray.100' },
    subText: { textDecoration: 'none' },
  },
  claimed: {
    card: { bg: 'linear-gradient(0deg, rgba(17, 170, 112, 0.1), rgba(17, 170, 112, 0.1)), #191D2C;' },
    supTitle: { color: 'other.green' },
    link: { color: '#62AA8F' },
    useCode: { color: '#3A655B' },
    code: { color: '#3A655B' },
    subText: { textDecoration: 'line-through' },
  },
  cancel: {
    card: { bg: 'gray.-120' },
    supTitle: { color: 'gray.160' },
    link: { color: 'gray.120' },
    useCode: { color: 'white' },
    code: { color: 'gray.100' },
    subText: { textDecoration: 'none' },
  },
};

export const AvailableBonusCard: FC<AvailableBonusCardProps> = ({
  caption,
  title,
  code,
  text,
  claimURL,
  cancelURL,
  linkText,
  linkURL,
  variant,
}) => {
  return (
    <Box textAlign="center" borderRadius="16px" overflow="hidden" width="full" py={6} {...variants[variant].card}>
      <Box display="inline-block">
        <Image src={String(imgCup.src || imgCup)} alt={title} width={154} height={156} />
      </Box>
      <Text textStyle="xs2" fontWeight="600" my={4} {...variants[variant].supTitle}>
        {caption}
      </Text>
      <Text textStyle="md2" fontWeight="600" color="white" my={4}>
        {title}
      </Text>
      <Text
        textStyle="s2"
        letterSpacing="-0.5px"
        my={5}
        bgColor="rgba(2, 2, 4, 0.2)"
        height="48px"
        padding="10px 0"
        {...variants[variant].useCode}
      >
        <FormattedMessage {...messages.useCode} />
        <Text as="span" {...variants[variant].code}>
          {' '}
          {code}
        </Text>
      </Text>
      {AvailableBonusCardContent({ variant, claimURL, cancelURL })}
      <Text textStyle="xs2" color="white" my={4} {...variants[variant].subText}>
        {text}
      </Text>
      <GLink href={linkURL}>
        <Text as="span" textStyle="xs2" opacity="0.6" textDecoration="underline" {...variants[variant].link}>
          {linkText}
        </Text>
      </GLink>
    </Box>
  );
};

const AvailableBonusCardContent = ({
  variant,
  claimURL,
  cancelURL,
}: {
  variant: VariantKey;
  claimURL?: string;
  cancelURL?: string;
}) => {
  switch (variant) {
    case 'locked':
      return (
        <Box
          textStyle="s"
          color="gray.140"
          borderWidth="2px"
          borderStyle="dashed"
          borderColor="gray.-40"
          borderRadius="48px"
          height="44px"
          display="inline-block"
          px={12}
          py={2}
        >
          <FormattedMessage {...messages.locked} />
        </Box>
      );
    case 'claimed':
      return (
        <Box
          textStyle="s"
          color="white"
          borderWidth="2px"
          borderStyle="dashed"
          borderColor="#254f49"
          borderRadius="48px"
          height="44px"
          display="inline-block"
          px={12}
          py={2}
        >
          {/* TODO: get use of <CheckmarkIcon /> */}
          <Box as="span" display="inline-block" mr={2}>
            <svg width="13" height="10" viewBox="0 0 13 10">
              <path
                d="M12.3234 1.08241C12.9091 1.66819 12.9091 2.61794 12.3234 3.20373L6.32336 9.20373C5.73757 9.78951 4.78782 9.78951 4.20204 9.20373L1.20204 6.20373C0.616249 5.61794 0.616249 4.66819 1.20204 4.08241C1.78782 3.49662 2.73757 3.49662 3.32336 4.08241L5.2627 6.02175L10.202 1.08241C10.7878 0.49662 11.7376 0.49662 12.3234 1.08241Z"
                fill="#11AA70"
              />
            </svg>
          </Box>
          <FormattedMessage {...messages.claimed} />
        </Box>
      );
    case 'available':
      return (
        <Box px={8} height="44px">
          <Link href={claimURL}>
            <Button variant="primary" width="100%">
              <FormattedMessage {...messages.claimNow} />
            </Button>
          </Link>
        </Box>
      );
    case 'cancel':
      return (
        <Box px={8} height="44px">
          <Link href={cancelURL}>
            <Button variant="security" width="100%">
              <FormattedMessage {...messages.cancelBonus} />
            </Button>
          </Link>
        </Box>
      );
  }
};

import { Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { useRouteService } from '@common/services/RouteService';

import Lighting from './assets/Lighting.png';
import MoneyBagImage from './assets/MoneyBag.png';
import Shield from './assets/Shield.png';

const messages = defineMessages({
  gameHistoryBtn: {
    id: 'User.gameHistoryBtn',
    defaultMessage: 'See Game History',
  },
  gameHistoryTitle: {
    id: 'User.gameHistory',
    defaultMessage: 'Game History',
  },
  gameHistoryDesc: {
    id: 'User.gameHistoryDesc',
    defaultMessage: 'Check and control your game history',
  },
  communicationBtn: {
    id: 'User.communicationBtn',
    defaultMessage: 'Edit Preferences',
  },
  communicationTitle: {
    id: 'User.communicationTitle',
    defaultMessage: 'Communication Preferences',
  },
  communicationDesc: {
    id: 'User.communicationDesc',
    defaultMessage: 'Set up communications and playground settings as you wish and make yourself feel like home',
  },
  responsibleGamingBtn: {
    id: 'User.responsibleGamingBtn',
    defaultMessage: 'Review',
  },
  responsibleGamingTitle: {
    id: 'User.responsibleGamingTitle',
    defaultMessage: 'Responsible Gaming',
  },
  responsibleGamingDesc: {
    id: 'User.responsibleGamingDesc',
    defaultMessage: 'Unlock instant withdrawals by completing account verification',
  },
});

export const ProfileSettings: FC = () => {
  const { formatMessage } = useIntl();
  const appRoutes = useRouteService();

  return (
    <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between" mt={16}>
      <Flex
        maxW="410px"
        h={{ base: 'auto', md: '340px' }}
        w="full"
        boxShadow="xl"
        rounded="lg"
        p={6}
        mr={4}
        borderRadius={16}
        direction="column"
        justifyContent="space-between"
        align="center"
        bg="gray.-120"
        color="white"
      >
        <Flex as="span" align="center" direction="column">
          <Image src={MoneyBagImage} width={60} height={88} alt={formatMessage(messages.gameHistoryTitle)} />
          <Text as="span" fontSize="xl" pt={4}>
            {formatMessage(messages.gameHistoryTitle)}
          </Text>
          <Text as="span" pt={4} align="center" color="gray.120">
            {formatMessage(messages.gameHistoryDesc)}
          </Text>
        </Flex>
        <Link href="/account/game-history" passHref>
          <Button variant="default" isFullWidth mt={6} color="white" as="a">
            {formatMessage(messages.gameHistoryBtn)}
          </Button>
        </Link>
      </Flex>
      <Flex
        maxW="410px"
        h={{ base: 'auto', md: '340px' }}
        w="full"
        boxShadow="xl"
        rounded="lg"
        p={6}
        mr={4}
        borderRadius={16}
        direction="column"
        justifyContent="space-between"
        align="center"
        bg="gray.-120"
        color="white"
        mt={{ base: 4, md: 0 }}
      >
        <Flex as="span" align="center" direction="column">
          <Image src={Lighting} width={76} height={81} alt={formatMessage(messages.communicationTitle)} />
          <Text as="span" fontSize="xl" pt={4}>
            {formatMessage(messages.communicationTitle)}
          </Text>
          <Text as="span" pt={4} align="center" color="gray.120">
            {formatMessage(messages.communicationDesc)}
          </Text>
        </Flex>
        <Link href={appRoutes.account.getCommunicationPagePath()} passHref>
          <Button variant="default" isFullWidth mt={6} color="white">
            {formatMessage(messages.communicationBtn)}
          </Button>
        </Link>
      </Flex>
      {/* Temporary hidden responsible gaming block */}
      <Flex
        maxW="410px"
        h={{ base: 'auto', md: '340px' }}
        w="full"
        boxShadow="xl"
        rounded="lg"
        p={6}
        borderRadius={16}
        direction="column"
        justifyContent="space-between"
        align="center"
        bg="gray.-120"
        color="white"
        mt={{ base: 4, md: 0 }}
        mb={{ base: 4, md: 0 }}
        visibility="hidden"
      >
        <Flex as="span" align="center" direction="column">
          <Image src={Shield} width={66} height={70} alt={formatMessage(messages.responsibleGamingTitle)} />
          <Text as="span" fontSize="xl" pt={4}>
            {formatMessage(messages.responsibleGamingTitle)}
          </Text>
          <Text as="span" pt={4} align="center" color="gray.120">
            {formatMessage(messages.responsibleGamingDesc)}
          </Text>
        </Flex>

        <Button variant="alternate" isFullWidth isDisabled mt={6} color="white">
          {formatMessage(messages.responsibleGamingBtn)}
        </Button>
      </Flex>
    </Flex>
  );
};

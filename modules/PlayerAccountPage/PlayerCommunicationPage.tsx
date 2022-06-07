import { Box, Center, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useMutation } from 'react-query';
import { StoryData } from 'storyblok-js-client';

import { changePlayerConsents } from '@api/player';
import { useRouteService } from '@common/services/RouteService';
import { Button } from '@components/Button/Button';
import { usePlayerState, usePlayerStateActions } from '@hooks/usePlayerState';
import { Player, PlayerCommunicationTypes, PlayerConsentValues } from '@sharedTypes/Player';

import Alert from './assets/Alert.png';
import { CommunicationCard } from './components/CommunicationCard';

const messages = defineMessages({
  communicationTitle: {
    id: 'User.communicationTitle',
    defaultMessage: 'Communication Preferences',
  },
  communicationPageDescription: {
    id: 'User.communicationPageDescription',
    defaultMessage: 'test',
  },
  updateConsentFailed: {
    id: 'Update.consentFailed',
    defaultMessage: 'Consent update failed, please try again later',
  },
  backToProfilePage: {
    id: 'User.backToProfilePage',
    defaultMessage: 'Back to Profile',
  },
});

type PlayerCommunicationPageProps = {
  stories: StoryData[];
};

export const PlayerCommunicationPage = ({ stories }: PlayerCommunicationPageProps) => {
  const { formatMessage } = useIntl();
  const { player } = usePlayerState();
  const appRoutes = useRouteService();

  const { updatePlayer } = usePlayerStateActions();

  const toast = useToast();
  const intl = useIntl();

  const [playerConsentState, setPlayerConsentState] = useState<PlayerConsentValues>({});

  useEffect(() => {
    if (player) {
      setPlayerConsentState({
        enableSmsSubscription: player?.subscriptionSmsEnabled,
        enableEmailSubscription: player?.subscriptionEmailEnabled,
        consentPhone: player?.consentPhone,
        consentPostmail: player?.consentPostmail,
        consentPush: player?.consentPush,
      });
    }
  }, [player]);

  const { mutate } = useMutation(changePlayerConsents, {
    onMutate: (data: PlayerConsentValues) => {
      const prev = playerConsentState;
      setPlayerConsentState(data);
      return prev;
    },
    onSuccess: (data: Player) => updatePlayer(data),
    onError: (_: unknown, prevState: PlayerConsentValues) => {
      setPlayerConsentState(prevState);
      toast({
        title: intl.formatMessage(messages.updateConsentFailed),
        status: 'error',
      });
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const changedConsentField = event.target.name as keyof typeof PlayerCommunicationTypes;

    const consentValues = {
      ...playerConsentState,
      [changedConsentField]: event.target.checked,
    };

    mutate(consentValues);
  };

  return (
    <Box py={{ base: 0, md: 8 }} pb="8" ml={{ base: 0, md: '10%' }}>
      {!player ? (
        <Center mt={6}>
          <Spinner size="xl" color="purple.400" textAlign="center" />
        </Center>
      ) : (
        <>
          <Link href={appRoutes.account.getSettingsPagePath()} passHref>
            <Button variant="link">
              <FormattedMessage {...messages.backToProfilePage} />
            </Button>
          </Link>
          <Text color="white" mt={{ base: 4, md: 0 }} pb={6} fontSize={{ base: 'm1', md: 'l1' }} fontWeight="600">
            <FormattedMessage {...messages.communicationTitle} />
          </Text>
          <Box
            maxW="880px"
            w="full"
            boxShadow="xl"
            rounded="lg"
            p={6}
            mb={4}
            borderRadius={16}
            bg="gray.-120"
            color="white"
          >
            <Flex direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'normal', md: 'center' }}>
              <Box width={{ base: 'auto', md: 20 }}>
                <Image src={Alert} width={44} height={44} alt={formatMessage(messages.communicationTitle)} />
              </Box>

              <Text pl={{ base: 0, md: 4 }}>
                <FormattedMessage {...messages.communicationPageDescription} />
              </Text>
            </Flex>
          </Box>
          <Flex direction={{ base: 'column', md: 'row' }} flexWrap={'wrap'}>
            {stories?.map((story) => (
              <CommunicationCard
                key={story.slug}
                checked={
                  !!playerConsentState?.[PlayerCommunicationTypes[story.slug as keyof typeof PlayerCommunicationTypes]]
                }
                name={PlayerCommunicationTypes[story.slug as keyof typeof PlayerCommunicationTypes]}
                title={story.content.title}
                description={story.content.description}
                onChange={handleChange}
              />
            ))}
          </Flex>
        </>
      )}
    </Box>
  );
};

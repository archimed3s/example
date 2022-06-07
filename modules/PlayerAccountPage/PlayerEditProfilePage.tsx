import { Box, Center, Link as ChakraLink, Flex, Spinner, Text } from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { Breadcrumb } from '@components/Breadcrumb/Breadcrumb';
import { usePlayerState } from '@hooks/usePlayerState/useStateReducer';
import { PlayerEditForm } from '@modules/PlayerAccountPage/components/PlayerEditForm';
import { VerificationCard } from '@modules/PlayerAccountPage/components/VerificationCard';

const messages = defineMessages({
  editProfileTitle: {
    id: 'User.editProfileTitle',
    defaultMessage: 'Edit Profile',
  },
  editProfileDescription: {
    id: 'User.editProfileDescription',
    defaultMessage: 'To change some of the information, you might need to contact',
  },
  customerSupport: {
    id: 'User.customerSupport',
    defaultMessage: 'Customer Support',
  },
  backToProfilePage: {
    id: 'User.backToProfilePage',
    defaultMessage: 'Back to Profile',
  },
});

export const PlayerEditProfilePage = () => {
  const { player } = usePlayerState();

  return (
    <Box maxW="1290" mx="auto" py={{ base: 0, md: 8 }} pb="8" ml={{ base: 0, md: '10%' }}>
      {!player ? (
        <Center mt={6}>
          <Spinner size="xl" color="purple.400" textAlign="center" />
        </Center>
      ) : (
        <>
          <Breadcrumb />
          <Text color="white" mt={{ base: 4, md: 0 }} py={2} fontSize={{ base: 'm1', md: 'l1' }} fontWeight="600">
            <FormattedMessage {...messages.editProfileTitle} />
          </Text>
          <Text color="gray.120" pt={2} display={{ base: 'none', md: 'block' }}>
            <FormattedMessage {...messages.editProfileDescription} />{' '}
            <ChakraLink>
              <Text color="primary.30" as="span">
                <FormattedMessage {...messages.customerSupport} />
              </Text>
            </ChakraLink>
          </Text>
          <Flex direction={{ base: 'column-reverse', md: 'row' }} flexWrap="wrap" mt={4}>
            <Box
              mr={{ base: 'auto', md: 4 }}
              mt={{ base: 4, md: 0 }}
              maxW="368"
              w="full"
              boxShadow="xl"
              rounded="lg"
              p={6}
              borderRadius={16}
              bg="gray.-120"
              color="white"
            >
              <PlayerEditForm />
            </Box>
            <VerificationCard kyc={player?.kyc} />
          </Flex>
        </>
      )}
    </Box>
  );
};

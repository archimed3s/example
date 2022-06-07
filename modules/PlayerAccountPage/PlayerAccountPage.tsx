import { Avatar, AvatarBadge, Box, Button, Center, Divider, Flex, HStack, Spinner, Text } from '@chakra-ui/react';
import clm from 'country-locale-map';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { useRouteService } from '@common/services/RouteService';
import { useCurrency } from '@hooks/useCurrency';
import { usePlayerState } from '@hooks/usePlayerState';

import { ProfileSettings } from './ProfileSettings';
import { CameraIcon } from './assets/CameraIcon';
import { CoinIcon } from './assets/CoinIcon';
import { InvalidIcon } from './assets/InvalidIcon';
import { LocationIcon } from './assets/LocationIcon';
import MoneyBagImage from './assets/MoneyBag.png';
import { ValidIcon } from './assets/ValidIcon';
import { VerificationCard } from './components/VerificationCard';

const messages = defineMessages({
  resetPasswordButton: {
    id: 'ChangePasswordForm.resetPasswordButton',
    defaultMessage: 'Change password',
  },
  cashierButton: {
    id: 'User.cashierButton',
    defaultMessage: 'Cashier',
  },
  somethingWentWrong: {
    id: 'ChangePasswordForm.somethingWentWrong',
    defaultMessage: 'Something went wrong',
  },
  profile: {
    id: 'User.profile',
    defaultMessage: 'Profile',
  },
  firstName: {
    id: 'User.firstName',
    defaultMessage: 'First name',
  },
  lastName: {
    id: 'User.lastName',
    defaultMessage: 'Last name',
  },
  email: {
    id: 'User.email',
    defaultMessage: 'Email',
  },
  phoneNumber: {
    id: 'User.phoneNumber',
    defaultMessage: 'Phone number',
  },
  dateOfBirth: {
    id: 'User.dateOfBirth',
    defaultMessage: 'Date of birth',
  },
  addEmail: {
    id: 'User.addEmail',
    defaultMessage: 'Add email',
  },
  addPhone: {
    id: 'User.addPhone',
    defaultMessage: 'Add phone',
  },
  cashier: {
    id: 'User.cashier',
    defaultMessage: 'Cashier',
  },
  editProfile: {
    id: 'User.editProfile',
    defaultMessage: 'Edit Profile',
  },
  myBonuses: {
    id: 'User.myBonuses',
    defaultMessage: 'My Bonuses',
  },
  real: {
    id: 'User.real',
    defaultMessage: 'Real',
  },
  bonus: {
    id: 'User.bonus',
    defaultMessage: 'Bonus',
  },
});

export const PlayerAccountPage = () => {
  const [image, setImage] = useState<string>('');
  const { balance, player } = usePlayerState();
  const appRoutes = useRouteService();
  const { getCurrencySymbol } = useCurrency();

  const { formatMessage } = useIntl();

  const totalAmount = Number(balance?.totalAmount) + Number(balance?.totalBonusAmount);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setImage(URL.createObjectURL(newImage));
    }
  };

  return (
    <Box mx="auto" py={{ base: 0, md: 8 }}>
      {!player ? (
        <Center mt={6}>
          <Spinner size="xl" color="purple.400" textAlign="center" />
        </Center>
      ) : (
        <>
          <Text fontSize={{ base: 'm1', md: 'l1' }} color="white" pb={6} fontWeight="600">
            <FormattedMessage {...messages.profile} />
          </Text>
          <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
            <Flex
              mr={4}
              maxW={500}
              minH={303}
              w="full"
              boxShadow="xl"
              rounded="lg"
              p={6}
              borderRadius={16}
              bg="gray.-120"
              color="white"
              direction="column"
              justifyContent="space-between"
            >
              <Flex direction={{ base: 'column', md: 'row' }}>
                <Flex mr={2} w={{ base: '100%', md: '50%' }} direction="column" justifyContent="space-between">
                  <Box>
                    <Avatar
                      bg="gray.10"
                      name={`${player?.firstName} ${player?.lastName}`}
                      w={116}
                      h={116}
                      src={image}
                      pos="relative"
                    >
                      <input accept="image/*" hidden id="avatar-image-upload" type="file" onChange={handleOnChange} />
                      <AvatarBadge pos="absolute" bottom={4} right={0} w={8} h={8} bg="gray.50">
                        <label htmlFor="avatar-image-upload">
                          <CameraIcon />
                        </label>
                      </AvatarBadge>
                    </Avatar>
                    <Text noOfLines={1} fontSize="s3" color="white" paddingTop="1rem" fontWeight="bold">
                      {player?.firstName} {player?.lastName}
                    </Text>
                    <Text noOfLines={1} fontSize="s3" color="gray.130">
                      {`@${player?.displayName || 'displayName'}`}
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  ml={{ base: 0, md: 2 }}
                  w={{ base: '100%', md: '50%' }}
                  pt={8}
                  direction="column"
                  justifyContent="space-between"
                >
                  <Box>
                    <Flex alignItems="center">
                      <Box>
                        <ValidIcon />
                      </Box>
                      <Text pl={2} noOfLines={1} wordBreak="break-all">
                        {player?.email}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" pt={4}>
                      <Box>{player?.phoneNumber ? <ValidIcon /> : <InvalidIcon />}</Box>
                      <Text pl={2} noOfLines={1}>
                        {player?.phoneNumber ? player?.phoneNumber : formatMessage(messages.addPhone)}
                      </Text>
                    </Flex>
                    {player?.countryId && (
                      <Flex w="full" alignItems="center" pt={4}>
                        <Box ml={1}>
                          <LocationIcon />
                        </Box>
                        <Text as="span" pl={2}>
                          {clm.getCountryByAlpha2(player?.countryId).name}
                        </Text>
                      </Flex>
                    )}
                  </Box>
                </Flex>
              </Flex>
              <HStack w={'100%'} mt={8} direction="row" spacing={2}>
                <Link href={appRoutes.account.getEditProfilePagePath()} passHref>
                  <Button variant="outline" isFullWidth>
                    {formatMessage(messages.editProfile)}
                  </Button>
                </Link>
                <Link href={appRoutes.account.getBonusesPagePath()} passHref>
                  <Button variant="default" isFullWidth>
                    {formatMessage(messages.myBonuses)}
                  </Button>
                </Link>
              </HStack>
            </Flex>
            <Flex
              maxW={368}
              mr={4}
              minH={{ base: 'auto', md: '303' }}
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
            >
              <Flex as="span" align="center" direction="column">
                <Image src={MoneyBagImage} width={60} height={88} alt={formatMessage(messages.cashier)} />
                <Flex alignItems="center" pt={4}>
                  <CoinIcon />
                  <Text as="span" pl={2} fontSize="s3" fontWeight="600">
                    {getCurrencySymbol()}
                    {totalAmount || 0}
                  </Text>
                </Flex>
                <Flex alignItems="center" pt={2}>
                  <Box pr={3}>
                    <Text as="span" color="gray.100">
                      {formatMessage(messages.real)}{' '}
                    </Text>
                    <Text as="span" fontWeight="600">
                      {getCurrencySymbol()}
                      {balance?.totalAmount || 0}
                    </Text>
                  </Box>
                  <Divider orientation="vertical" color="gray.0" />
                  <Box pl={3}>
                    <Text as="span" color="gray.100">
                      {formatMessage(messages.bonus)}{' '}
                    </Text>
                    <Text as="span" fontWeight="600">
                      {getCurrencySymbol()}
                      {balance?.totalBonusAmount || 0}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <Link href={appRoutes.account.getCashierPagePath()} passHref>
                <Button variant="primary" isFullWidth mt={6}>
                  {formatMessage(messages.cashier)}
                </Button>
              </Link>
            </Flex>
            <Box mt={{ base: 4, md: 0 }}>
              <VerificationCard kyc={player?.kyc} />
            </Box>
          </Flex>
          <ProfileSettings />
        </>
      )}
      {/* TODO: should discuss where put ResetPasswordButton */}
      {/* <Box py={3}> */}
      {/*  <Link href={appRoutes.getResetPasswordPagePath()} passHref> */}
      {/*    <Button bg="gray.-50" color="white"> */}
      {/*      {formatMessage(transaltions.resetPasswordButton)} */}
      {/*    </Button> */}
      {/*  </Link> */}
      {/* </Box> */}
    </Box>
  );
};

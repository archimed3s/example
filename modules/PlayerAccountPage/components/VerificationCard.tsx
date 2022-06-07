import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import ShieldImage from '@modules/PlayerAccountPage/assets/Shield.png';
import { PlayerKyc, PlayerKycStatus } from '@sharedTypes/Player';

import { KycVerification } from './KycVerification/KycVerification';

type VerificationCardProps = {
  kyc?: PlayerKyc;
};

const messages = defineMessages({
  verification: {
    id: 'User.verification',
    defaultMessage: 'Verification',
  },
  verificationMsg: {
    id: 'User.verificationMsg',
    defaultMessage: 'Unlock instant withdrawals by completing account verification',
  },
});

export const VerificationCard: FC<VerificationCardProps> = ({ kyc = {} }) => {
  const { formatMessage } = useIntl();

  const isValid = Boolean(kyc.info && (!kyc.info.expiresAt || kyc.info.expiresAt > new Date()));
  const isSubmitted = isValid && kyc.info?.status === PlayerKycStatus.SUBMITTED;
  const isVerified = isValid && kyc.info?.status === PlayerKycStatus.APPROVED;

  return (
    <Flex
      maxW="368"
      minH="303"
      maxH="303"
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
    >
      <Flex as="span" align="center" direction="column">
        <Image src={ShieldImage} width={66} height={70} alt={formatMessage(messages.verification)} />
        <Flex alignItems="center" pt={6}>
          <Text as="span" fontSize="xl" fontWeight="600">
            {formatMessage(messages.verification)}
          </Text>
        </Flex>
        <Text as="span" pt={2} align="center" color={isVerified ? 'whiteGold' : 'gray.120'}>
          {formatMessage(messages.verificationMsg)}
        </Text>
      </Flex>
      <KycVerification isSubmitted={isSubmitted} isVerified={isVerified} kycProviderId={kyc?.providerId} />
    </Flex>
  );
};

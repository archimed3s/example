import { Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useIntl } from 'react-intl';

import ShieldImage from '@modules/PlayerAccountPage/assets/Shield.png';

import { kycMessages } from './messages';

export const ConfirmationMessage = () => {
  const { formatMessage } = useIntl();

  return (
    <VStack justifyContent="center" pt={8} pb={6}>
      <Image src={ShieldImage} width={66} height={70} alt={formatMessage(kycMessages.requestSent)} />

      <Text as="h2" fontSize="xl" fontWeight="600" mb={2}>
        {formatMessage(kycMessages.requestSent)}
      </Text>

      <Text fontSize="sm" color="gray.160" mb={2}>
        {formatMessage(kycMessages.reviewRequestSent)}
      </Text>
    </VStack>
  );
};

import { HStack, Skeleton, StackProps, Text, VStack } from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { LogoLicence } from './LogoLicence';

const messages = defineMessages({
  licenses: {
    id: 'Footer.licenses',
    defaultMessage: 'Licenses',
  },
});

type FooterLicenseProps = {
  isLoading?: boolean;
} & StackProps;

export const FooterLicense = ({ isLoading, ...stackProps }: FooterLicenseProps) => {
  return (
    <VStack alignItems="flex-start" {...stackProps}>
      {!isLoading && (
        <>
          <Text textStyle="s" opacity="80%" fontWeight="600">
            <FormattedMessage {...messages.licenses} />
          </Text>
          <LogoLicence />
        </>
      )}
      {isLoading && (
        <>
          <Skeleton width="100%" height={6} marginBottom={2} />
          <HStack spacing={4}>
            <Skeleton width={54} height={54} />
            <Skeleton width={54} height={54} />
          </HStack>
        </>
      )}
    </VStack>
  );
};

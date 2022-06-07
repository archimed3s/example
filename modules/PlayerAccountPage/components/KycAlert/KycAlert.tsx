import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

type KycAlertProps = {
  content: string;
};

export const KycAlert: FC<KycAlertProps> = ({ content }) => (
  <Flex backgroundColor="gray.-80" borderRadius={8} p={4} gridGap={3} alignItems="flex-start">
    <Text alignSelf="center" fontSize="md" flex={1}>
      {content}
    </Text>
  </Flex>
);

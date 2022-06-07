import { Box, Flex, Text } from '@chakra-ui/react';
import { ChangeEvent, FC } from 'react';

import { Switch } from '@components/Switch/Switch';
import { PlayerCommunicationTypes } from '@sharedTypes/Player';

type CommunicationCardProps = {
  name: PlayerCommunicationTypes;
  title: string;
  checked: boolean;
  description?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const CommunicationCard: FC<CommunicationCardProps> = ({
  name,
  title,
  description,
  onChange,
  checked,
}: CommunicationCardProps) => {
  return (
    <Box
      mt={4}
      mr={{ base: 'auto', md: 4 }}
      maxW="432"
      w="full"
      boxShadow="xl"
      rounded="lg"
      p={6}
      borderRadius={16}
      bg="gray.-120"
      color="white"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="m1" pr={2}>
          {title}
        </Text>
        <Switch size="md" isChecked={checked} name={name} onChange={onChange} />
      </Flex>
      {description && (
        <Text pt={4} color="gray.160">
          {description}
        </Text>
      )}
    </Box>
  );
};

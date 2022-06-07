import { ModalHeader as ChakraModalHeader, Flex, Text, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ModalHeaderProps = {
  title: ReactNode;
  subtitle?: string;
  onClose: () => void;
};

export const ModalHeader = ({ title, subtitle }: ModalHeaderProps) => (
  <ChakraModalHeader fontSize="m2">
    <Flex justifyContent="space-between">
      <VStack alignItems="flex-start">
        <Text as="h1" fontSize="2xl" fontWeight="600">
          {title}
        </Text>

        {subtitle && (
          <Text as="p" fontSize="md" fontWeight="400" color="gray.120">
            {subtitle}
          </Text>
        )}
      </VStack>
    </Flex>
  </ChakraModalHeader>
);

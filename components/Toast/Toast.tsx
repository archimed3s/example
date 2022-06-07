import { Flex, Text } from '@chakra-ui/react';

import { Button } from '@components/Button/Button';

type ToastProps = {
  type: 'success' | 'error';
  onClose: () => void;
  title: string;
  closeText: string;
  id: string;
};

export const Toast = ({ type, onClose, title, closeText, id }: ToastProps) => (
  <Flex
    role="alert"
    aria-labelledby={`label-${id}-title`}
    color="white"
    bgGradient={type === 'success' ? 'linear(green.0 0%, green.10 100%)' : 'linear(red.0 0%, red.10 100%)'}
    boxShadow={
      type === 'success'
        ? '0px 0px 48px rgba(19, 173, 110, 0.5), inset 0px 1.4px 0px rgba(255, 255, 255, 0.22)'
        : '0px 0px 48px rgba(237, 99, 117, 0.5), inset 0px 1.4px 0px rgba(255, 255, 255, 0.22)'
    }
    borderRadius="12px"
    p="15px"
    alignItems="center"
    justifyContent="space-between"
  >
    <Flex flex={1}>
      <Text fontSize="s2" pl="12px" fontWeight="600" flex={1} id={`label-${id}-title`}>
        {title}
      </Text>
    </Flex>

    <Button
      size="sm"
      ml="15px"
      ringColor="white"
      _hover={{
        opacity: '0.3',
      }}
      variant="outline"
      onClick={onClose}
    >
      {closeText}
    </Button>
  </Flex>
);

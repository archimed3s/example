import { Box, VStack } from '@chakra-ui/react';
import { ComponentType, useEffect, useRef } from 'react';

import { Button } from '@components/Button/Button';

import { DropdownItem } from './Dropdown';

export type DropdownContainerProps = {
  onItemSelect: (item: DropdownItem) => void;
  items: DropdownItem[];
  CustomContainer?: ComponentType<DropdownContainerProps>;
  selectedItem?: DropdownItem;
};

export const DropdownContainer = ({ CustomContainer, ...rest }: DropdownContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <Box
      position="absolute"
      mt={2}
      zIndex={1}
      right={0}
      left={0}
      borderRadius={8}
      maxH="200px"
      overflowY="scroll"
      bg="gray.-70"
    >
      {CustomContainer ? (
        <CustomContainer {...rest} />
      ) : (
        <VStack spacing={0}>
          {rest.items.map((item) => (
            <Button
              variant="ghost"
              w="100%"
              p={3}
              zIndex={10}
              _hover={{
                boxShadow: 'none',
                bg: 'gray.-30',
                borderRadius: 0,
              }}
              justifyContent="flex-start"
              onClick={() => rest.onItemSelect(item)}
              bg={rest.selectedItem?.value === item.value ? 'gray.-30' : 'transparent'}
              key={item.value}
            >
              {item.icon && <Box pr={3}>{item.icon}</Box>}
              {item.label}
            </Button>
          ))}
        </VStack>
      )}
    </Box>
  );
};

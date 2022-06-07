import { Box, Flex } from '@chakra-ui/react';
import { cloneElement } from 'react';

import { DropdownContainerProps } from '@components/Dropdown/DropdownContainer';

export const LanguagePickerContainer = ({ items, onItemSelect }: DropdownContainerProps) => (
  <Flex flexWrap="wrap" justifyContent="center" p={2} pb={1}>
    {items.map((item) => (
      <Flex
        mb={1}
        justifyContent="center"
        alignItems="center"
        key={item.value}
        h="44px"
        w="44px"
        borderRadius="50%"
        onClick={() => onItemSelect(item)}
        cursor="pointer"
        border="2px solid"
        borderColor="transparent"
        _hover={{
          border: '2px solid',
          borderColor: 'primary.60',
        }}
      >
        <Box w={8} h={8} borderRadius="50%" overflow="hidden">
          {item.icon && cloneElement(item.icon, { size: 8, objectFit: 'cover' })}
        </Box>
      </Flex>
    ))}
  </Flex>
);

import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { StoryblokImage } from '@sharedTypes/api/storyblok';

const divider = <Box w="1px" h="35" bgGradient="linear(to-b, #6775A9 1%, #6775A9 20%, #6775A9 1%)" />;

export const LoginHeader = ({ items }: { items: StoryblokImage[] }) => {
  return (
    <HStack pt={12} px={36} justifyContent={'space-between'} divider={divider}>
      {items.map((item) => (
        <Flex alignItems="center" key={item.id}>
          <Image src={item.filename} width={24} height={35} alt={item.alt ?? item.filename} />
          <Text ml={3}>{item.title}</Text>
        </Flex>
      ))}
    </HStack>
  );
};

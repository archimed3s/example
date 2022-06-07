import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { ReactElement } from 'react';

import { DotDivider } from '@components/DotDivider/DotDivider';

type SearchCardProps = {
  imgSrc: string;
  title: string;
  productName: string;
  percent: number;
  winTitle: string;
  winNumber: string;
  currencyIcon?: ReactElement;
};

export const SearchCard = ({ imgSrc, title, currencyIcon, productName, winTitle, winNumber }: SearchCardProps) => (
  <HStack spacing={3}>
    <Flex flexShrink={0} rounded="lg" overflow="hidden">
      <Image src={imgSrc} width="64px" height="64px" />
    </Flex>
    <Flex maxW="100%">
      <VStack alignItems="flex-start" spacing={2} w="100%">
        <HStack justifyContent="flex-start" alignSelf="stretch">
          <Text as="span" size="s2" fontWeight="600" isTruncated>
            {title}
          </Text>
          {currencyIcon}
        </HStack>
        <HStack justifyContent="flex-start" textStyle="xs2">
          <Text as="span" color="gray.160">
            {productName}
          </Text>
          <DotDivider bg="gray.40" />
          <Text as="span" color="gray.160">
            {winTitle}
          </Text>
          <Text as="span">{winNumber}</Text>
        </HStack>
      </VStack>
    </Flex>
  </HStack>
);

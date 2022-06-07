import { HStack, Image, Skeleton, StackProps, Text, VStack } from '@chakra-ui/react';

import { FooterConfig } from '@components/Footer/storyblokUtils';

type FooterCopyrightProps = {
  data:
    | {
        logo: FooterConfig['logo'];
        copyright: FooterConfig['copyright'];
      }
    | undefined
    | null;
} & StackProps;

export const FooterCopyright = ({ data, ...stackProps }: FooterCopyrightProps) => {
  return (
    <VStack alignItems="flex-start" spacing={4} width="min(100%, 496px)" {...stackProps}>
      {data && (
        <>
          <HStack alignContent="space-between">
            <Image opacity="80%" src={data.logo.filename} alt="Company logo" />
          </HStack>
          <Text textStyle="xs" opacity="50%">
            {data.copyright}
          </Text>
        </>
      )}
      {!data && (
        <>
          <Skeleton height={8} width={160} marginBottom={2} />
          <Skeleton height={3} width="100%" marginTop={1} />
          <Skeleton height={3} width="60%" />
          <Skeleton height={3} width="80%" />
          <Skeleton height={3} width="55%" />
        </>
      )}
    </VStack>
  );
};

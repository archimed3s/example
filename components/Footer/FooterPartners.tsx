import { Flex, Image, Skeleton, Stack, StackProps, useBreakpointValue } from '@chakra-ui/react';

import { FooterConfig } from '@components/Footer/storyblokUtils';

type FooterPartnersProps = {
  partners: FooterConfig['assets'] | undefined;
} & StackProps;

const skeletonElementsWidth = [35, 25, 15, 35, 25, 15, 10, 35, 25, 15, 35, 25, 20, 10, 35, 25];

const skeletonStackSx = { gap: '20px 40px' };

export const FooterPartners = ({ partners, ...stackProps }: FooterPartnersProps) => {
  const logosSx =
    useBreakpointValue({
      base: { gap: '16px 20px' },
      md: { gap: '20px 55px' },
    }) ?? {};

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      flexWrap="wrap"
      sx={partners ? logosSx : skeletonStackSx}
      {...stackProps}
    >
      {partners?.map((image) => (
        <Flex key={image.id} alignItems="center">
          <Image src={image.filename} alt={image.alt ?? ''} />
        </Flex>
      ))}
      {!partners &&
        skeletonElementsWidth.map((width, index) => <Skeleton key={index} height={8} width={`${width * 4}px`} />)}
    </Stack>
  );
};

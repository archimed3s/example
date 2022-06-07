import { BoxProps, Skeleton } from '@chakra-ui/react';

type PrimaryBannerProps = Pick<BoxProps, 'gridArea' | 'gridColumn'>;

export const PromoBanner = ({ ...containerProps }: PrimaryBannerProps) => {
  return (
    <Skeleton
      borderRadius={8}
      height={{ base: 'auto', md: '430px', xl: '449px' }}
      minHeight={{ base: '470px', md: 'auto' }}
      {...containerProps}
    />
  );
};

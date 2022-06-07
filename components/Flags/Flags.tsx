import { Image, ImageProps } from '@chakra-ui/react';

import { countryCodes } from './countryCodes';

type FlagProps = ImageProps & {
  country: typeof countryCodes[number];
  size?: number;
};

export const Flags = ({ country, size = 5, alt, ...rest }: FlagProps) => {
  return <Image src="test" alt={alt ?? `${country} Flag`} h={size} w={size} {...rest} />;
};

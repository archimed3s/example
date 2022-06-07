import { Box, RadioProps, useRadio } from '@chakra-ui/react';
import { FC } from 'react';

import { buttonsTheme } from '@theme/buttonsTheme';

export const RadioCard: FC<RadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" position="relative">
      <input {...input} style={{ ...input.style, width: '100%', height: '100%' }} required />

      <Box
        {...checkbox}
        {...buttonsTheme.Button.baseStyle}
        {...buttonsTheme.Button.variants.default}
        fontSize="md"
        fontWeight={600}
        cursor="pointer"
        _checked={{
          ...buttonsTheme.Button.variants.primary,
          cursor: 'default',
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

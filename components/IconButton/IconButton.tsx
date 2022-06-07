import { IconButton as ChakraIconButton, IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export enum IconButtonSizeEnum {
  XSMALL = 'squareXs',
  SMALL = 'squareSm',
  MEDIUM = 'squareMd',
  LARGE = 'squareLg',
}

export type IconButtonProps = ChakraIconButtonProps & {
  variant?:
    | 'gray'
    | 'primary'
    | 'support'
    | 'payment'
    | 'blur'
    | 'security'
    | 'outline'
    | 'default'
    | 'alternate'
    | 'ghost'
    | 'link'
    | 'round'
    | 'tag'
    | 'unstyled'
    | 'flatGray';
  size?: IconButtonSizeEnum;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => (
  <ChakraIconButton {...props} ref={ref} />
));
IconButton.displayName = 'IconButton';

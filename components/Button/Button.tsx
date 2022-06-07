import { Button as ChakraButton, ButtonProps as ChakraButtonProps, ComponentWithAs } from '@chakra-ui/react';

export type ButtonProps = ChakraButtonProps & {
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
    | 'flatGray'
    | 'unstyled';
  size?: 'sm' | 'md';
};

export const Button = ChakraButton as ComponentWithAs<'button', ButtonProps>;

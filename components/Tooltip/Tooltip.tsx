import { Tooltip as ChakraTooltip, TooltipProps as ChakraTooltipProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type TooltipProps = ChakraTooltipProps & {
  children: ReactNode;
};

export const Tooltip = ({ children, ...rest }: TooltipProps) => (
  // Add bg as temp solution during release this PR https://github.com/chakra-ui/chakra-ui/pull/5287
  <ChakraTooltip hasArrow bg="gray.0" {...rest}>
    {children}
  </ChakraTooltip>
);

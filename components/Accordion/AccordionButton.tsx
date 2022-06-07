import { AccordionButtonProps, AccordionButton as ChakraAccordionButton } from '@chakra-ui/react';

export const AccordionButton = ({ children, ...props }: AccordionButtonProps) => (
  <h3>
    <ChakraAccordionButton {...props}>{children}</ChakraAccordionButton>
  </h3>
);

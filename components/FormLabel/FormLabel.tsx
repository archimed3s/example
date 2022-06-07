import { FormLabel as ChakraFormLabel, FormLabelProps as ChakraFormLabelProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type FormLabelProps = { isRequired?: boolean; children: ReactNode } & ChakraFormLabelProps;

export const FormLabel = ({ children, isRequired, ...rest }: FormLabelProps) => (
  <ChakraFormLabel mb={2} {...rest}>
    <Text color="white" fontSize="s1" fontWeight={600} mb={2}>
      {children}

      {isRequired && (
        <Text as="span" color="watermelon" ml={1}>
          *
        </Text>
      )}
    </Text>
  </ChakraFormLabel>
);

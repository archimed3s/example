import { Box, Textarea as ChakraTextarea, TextareaProps as ChakraTextareaProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { FormLabel } from '@components/FormLabel/FormLabel';

export type TextareaProps = ChakraTextareaProps & { label?: string; isRequired?: boolean };

export const Textarea = forwardRef<HTMLTextAreaElement | null, TextareaProps>(
  ({ label, isRequired, ...rest }: TextareaProps, ref) => (
    <Box>
      {label && (
        <FormLabel htmlFor={rest.id} isRequired={isRequired}>
          {label}
        </FormLabel>
      )}
      <ChakraTextarea
        bg="gray.-140"
        color="white"
        p={4}
        borderRadius="8px"
        borderColor="gray.-80"
        _placeholder={{ color: 'gray.40' }}
        _hover={{
          borderColor: 'gray.0',
        }}
        resize="none"
        ref={ref}
        {...rest}
      />
    </Box>
  ),
);

Textarea.displayName = 'Textarea';

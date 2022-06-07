import {
  As,
  Box,
  BoxProps,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  PlacementWithLogical,
  Text,
} from '@chakra-ui/react';
import { ReactNode, forwardRef } from 'react';

import { FormLabel } from '@components/FormLabel/FormLabel';
import { Tooltip } from '@components/Tooltip/Tooltip';

type ExtractAsProps<T> = T extends As<infer Props> ? Props : Record<string, unknown>;

export type InputProps = ChakraInputProps & {
  infoText?: string;
  errorText?: string;
  errorTextPlacement?: PlacementWithLogical;
  isRequired?: boolean;
  label?: ReactNode;
  id?: string;
  rightElement?: ReactNode;
  leftElement?: ReactNode;
  wrapperProps?: BoxProps;
} & ExtractAsProps<ChakraInputProps['as']>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      infoText,
      rightElement,
      errorText,
      label,
      id,
      leftElement,
      wrapperProps,
      isRequired,
      errorTextPlacement,
      bg,
      ...rest
    }: InputProps,
    ref,
  ) => {
    return (
      <Box {...wrapperProps}>
        {label && (
          <FormLabel htmlFor={id} isRequired={isRequired}>
            {label}
          </FormLabel>
        )}
        <Tooltip isOpen={!!errorText} label={errorText} placement={errorTextPlacement || 'auto-end'} offset={[16, 16]}>
          <div>
            {rightElement || leftElement ? (
              <InputGroup>
                {leftElement && (
                  <InputLeftElement pl={4} pr={3} h="100%">
                    {leftElement}
                  </InputLeftElement>
                )}
                <ChakraInput
                  bg={bg || 'gray.-140'}
                  borderColor="gray.-80"
                  py={2}
                  isRequired={isRequired}
                  pl={leftElement ? 10 : 4}
                  pr={rightElement ? 10 : 4}
                  borderRadius="8px"
                  id={id}
                  {...rest}
                  ref={ref}
                />
                {rightElement && (
                  <InputRightElement pr={4} h="100%">
                    {rightElement}
                  </InputRightElement>
                )}
              </InputGroup>
            ) : (
              <ChakraInput
                bg={bg || 'gray.-140'}
                py={2}
                px={4}
                borderColor="gray.-80"
                isRequired={isRequired}
                {...rest}
                ref={ref}
              />
            )}
          </div>
        </Tooltip>

        {infoText && (
          <Text color="gray.40" fontSize="s1" mt={1}>
            {infoText}
          </Text>
        )}
      </Box>
    );
  },
);
Input.displayName = 'Input';

import { Box, Select as ChakraSelect, SelectProps as ChakraSelectProps, Flex, FormLabel } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction } from 'react';

type SelectOption = {
  text: string;
  value: string;
};

type SelectProps = ChakraSelectProps & {
  label: string;
  placeholder: string;
  options: string[] | SelectOption[];
  activeOption: string;
  setActiveOption: Dispatch<SetStateAction<string>>;
};

export const Select: FC<SelectProps> = ({
  label,
  placeholder,
  options,
  activeOption,
  setActiveOption,
  width,
  ...selectProps
}) => (
  <Flex position="relative" width={width || '200px'}>
    <Box
      as="fieldset"
      position="absolute"
      w="100%"
      h="100%"
      border="1px solid"
      borderColor="whiteAlpha.300"
      rounded="md"
      px={3}
    >
      <Box as="legend" fontSize="sm" display="block" h="1px" px={1} fontWeight={500} visibility="hidden">
        {label}
      </Box>
    </Box>
    <FormLabel
      htmlFor={label}
      position="absolute"
      top="-30%"
      m={0}
      ml="calc(0.75rem + 1px)"
      px={1}
      fontSize="sm"
      color="gray.80"
    >
      {label}
    </FormLabel>
    <ChakraSelect
      id={label}
      placeholder={placeholder}
      value={activeOption}
      onChange={(e) => setActiveOption(e.target.value)}
      border="none"
      _focus={{
        border: 'none',
      }}
      {...selectProps}
    >
      {options.map((option) => {
        if (typeof option === 'string') {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        }
        return (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        );
      })}
    </ChakraSelect>
  </Flex>
);

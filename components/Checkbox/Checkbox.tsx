import { Checkbox as ChakraCheckbox, CheckboxProps } from '@chakra-ui/react';

export const Checkbox = ({ icon, isChecked, ...props }: CheckboxProps) => (
  <ChakraCheckbox {...props} icon={isChecked ? icon : undefined} />
);

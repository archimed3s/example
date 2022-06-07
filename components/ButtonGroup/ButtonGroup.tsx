import { Flex, FlexProps, useRadioGroup } from '@chakra-ui/react';
import { FC } from 'react';

import { RadioCard } from './RadioCard';

export type ButtonGroupOption = {
  name: string;
  value: string;
};

type ButtonGroupProps = FlexProps & {
  options: ButtonGroupOption[];
  activeButton: string;
  name?: string;
  onOptionChanged: (value: string) => void;
};

export const ButtonGroup: FC<ButtonGroupProps> = ({ options, activeButton, onOptionChanged, name, ...flexProps }) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue: activeButton,
    onChange: (value) => {
      onOptionChanged(value);
    },
  });

  const group = getRootProps();

  return (
    <Flex {...group} gridGap={2} {...flexProps}>
      {options.map(({ name, value }) => (
        <RadioCard key={name} {...getRadioProps({ value: name })}>
          {value}
        </RadioCard>
      ))}
    </Flex>
  );
};

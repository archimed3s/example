import { Box, BoxProps, Text } from '@chakra-ui/react';
import { ComponentType, ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import { DropdownContainer, DropdownContainerProps } from '@components/Dropdown/DropdownContainer';
import { IconButton, IconButtonSizeEnum } from '@components/IconButton/IconButton';
import { Input } from '@components/Input/Input';

export type DropdownItem = { label: string | number; value: string; icon?: ReactElement; [key: string]: unknown };

type CustomComponentsType = {
  Container: ComponentType<DropdownContainerProps>;
};

type DropdownProps = {
  isOpen?: boolean;
  placeholder?: string;
  selectedItem?: DropdownItem;
  items: DropdownItem[];
  label?: string;
  components?: CustomComponentsType;
  labelBg?: string;
  inputBg?: string;
  onChange?: (item: DropdownItem) => void;
  testId?: string;
  disabled?: boolean;
} & Omit<BoxProps, 'onChange'>;

export const Dropdown = ({
  isOpen: controlledOpen,
  items,
  placeholder,
  label,
  components,
  labelBg,
  onChange,
  inputBg,
  selectedItem: defaultSelectedItem,
  id,
  testId,
  disabled,
  ...rest
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(controlledOpen);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(defaultSelectedItem);
  const { Container } = components ?? {};

  useEffect(() => {
    setIsOpen(controlledOpen);
  }, [controlledOpen]);

  useEffect(() => {
    setSelectedItem(defaultSelectedItem);
  }, [defaultSelectedItem]);

  const onDropdownClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onItemSelect = useCallback(
    (item: DropdownItem) => {
      setIsOpen(false);
      setSelectedItem(item);
      if (onChange) {
        onChange(item);
      }
    },
    [onChange],
  );

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside: EventListener = (event) => {
      if (isOpen && ref.current && !ref.current.contains(event.target as Node)) {
        event.stopPropagation();
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Box position="relative" ref={ref} id={id} {...rest}>
      {label && (
        <Text
          as="span"
          position="absolute"
          top="-14px"
          left={4}
          zIndex={2}
          bg={labelBg || 'gray.-160'}
          textStyle="xs2"
          px={1}
          color={isOpen ? 'white' : 'gray.80'}
        >
          {label}
        </Text>
      )}
      <Input
        type="button"
        onClick={onDropdownClick}
        leftElement={selectedItem?.icon}
        cursor="pointer"
        color={selectedItem?.label ? 'white' : 'gray.40'}
        data-testid={testId}
        disabled={disabled}
        rightElement={
          <IconButton
            aria-label=""
            variant="unstyled"
            size={IconButtonSizeEnum.XSMALL}
            onClick={onDropdownClick}
            icon={isOpen}
            disabled={disabled}
            _disabled={{
              bgColor: 'transparent',
            }}
          />
        }
        borderColor={isOpen ? 'gray.160' : 'gray.-80'}
        textAlign="left"
        value={selectedItem?.label || placeholder}
        bg={inputBg}
      />

      {isOpen && (
        <DropdownContainer
          CustomContainer={Container}
          items={items}
          onItemSelect={onItemSelect}
          selectedItem={selectedItem}
        />
      )}
    </Box>
  );
};

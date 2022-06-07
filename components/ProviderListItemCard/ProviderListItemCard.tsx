import { Center, HStack, Radio, StackProps, Text, VStack, useRadioGroupContext } from '@chakra-ui/react';
import NImage from 'next/image';
import { ReactNode, forwardRef, useCallback, useMemo, useRef } from 'react';

type ListItemCardProps = Pick<StackProps, 'bgColor' | 'cursor'> & {
  iconSrc: string;
  iconAlt: string;
  title: string | ReactNode;
  description: string | ReactNode;
  value: string;
  onClick?: (value: string) => void;
  hideControl?: boolean;
};

export const ProviderListItemCard = forwardRef<HTMLDivElement | null, ListItemCardProps>(
  ({ iconSrc, iconAlt, title, description, value, hideControl, onClick, ...stackProps }: ListItemCardProps, ref) => {
    const checkboxElement = useRef<HTMLInputElement | null>(null);
    const radioContext = useRadioGroupContext();
    const selectable = radioContext !== undefined;

    const checkStyle = useMemo(
      () =>
        radioContext?.value === value
          ? {
              bgColor: 'gray.-140',
              borderColor: 'gray.-60',
            }
          : undefined,
      [radioContext?.value, value],
    );

    const onItemClick = useCallback(() => {
      if (selectable) {
        checkboxElement.current?.click();
      } else {
        onClick?.(value);
      }
    }, [onClick, selectable, value]);

    return (
      <HStack
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onClick={onItemClick}
        padding={3}
        borderRadius={8}
        borderStyle="solid"
        borderWidth={1}
        borderColor="transparent"
        sx={checkStyle}
        ref={ref}
        {...stackProps}
      >
        <NImage width="80px" height="54px" src={iconSrc} alt={iconAlt} />
        <VStack flexGrow={2} alignItems="flex-start" fontSize="s2">
          <Text>{title}</Text>
          <Text color="gray.160">{description}</Text>
        </VStack>
        {!hideControl && (
          <Center width={8}>{selectable && <Radio ref={checkboxElement} width={5} value={value} />}</Center>
        )}
      </HStack>
    );
  },
);
ProviderListItemCard.displayName = 'ProviderListItemCard';

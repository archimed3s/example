import { Badge as ChakraBadge, BadgeProps as ChakraBadgeProps } from '@chakra-ui/react';

export type BadgeProps = ChakraBadgeProps & {
  type?: 'red' | 'green' | 'default';
};

const TYPE_MAPPING = {
  default: {
    bg: 'rgba(97, 106, 142, 0.3)',
    color: 'white',
  },
  green: {
    bg: 'rgba(17, 170, 112, 0.2)',
    color: 'other.green',
  },
  red: {
    bg: 'rgba(244, 105, 131, 0.2)',
    color: 'other.red',
  },
} as const;

export const Badge = ({ type = 'default', ...rest }: BadgeProps) => (
  <ChakraBadge
    rounded="full"
    px={2}
    py={1}
    fontWeight={600}
    bg={TYPE_MAPPING[type].bg}
    color={TYPE_MAPPING[type].color}
    {...rest}
  />
);

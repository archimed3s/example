import { Flex, Spacer, Text, TextProps, VStack } from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { Badge, BadgeProps } from '@components/Badge/Badge';

const TransactionCardAmount = (props: TextProps) => <Text textStyle="s2" fontWeight="600" color="white" {...props} />;

const TransactionCardStatus = (props: BadgeProps) => <Badge {...props} />;

const TransactionInfo = (props: TextProps) => (
  <Text as="span" color="gray.160" fontSize="s1" marginRight="auto" {...props} />
);

const TransactionCardDate = (props: TextProps) => (
  <Text
    as="span"
    color="gray.120"
    fontSize="s1"
    marginLeft="auto"
    whiteSpace="nowrap"
    alignSelf="baseline"
    {...props}
  />
);

const defaultDateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' });

type Money = {
  amount: number;
  currency: string;
};

const formatMoney = (money: Money) => {
  const prefix = money.amount > 0 ? '+' : '';

  let value = `${money.currency}${money.amount}`;

  try {
    value = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: money.currency,
      maximumFractionDigits: money.amount % 1 ? 2 : 0,
    }).format(money.amount);
  } catch (err) {}

  return `${prefix}${value}`;
};

type Props = {
  amount: number;
  currency: string;
  status: 'pending' | 'cancelled' | 'confirmed';
  info: string | null;
  date: Date | null;
};

const messages = defineMessages({
  pending: {
    id: 'TransactionCard.pendingStatus',
    defaultMessage: 'Pending',
  },
  cancelled: {
    id: 'TransactionCard.cancelledStatus',
    defaultMessage: 'Cancelled',
  },
  confirmed: {
    id: 'TransactionCard.confirmedStatus',
    defaultMessage: 'Confirmed',
  },
});

export const TransactionCard = (props: Props) => {
  const date = props.date ? defaultDateFormatter.format(props.date) : null;

  const getBadgeColor = (status: 'pending' | 'cancelled' | 'confirmed') => {
    switch (status) {
      case 'cancelled':
        return 'red';
      case 'confirmed':
        return 'green';
      default:
        return 'default';
    }
  };

  const statusMessage =
    props.status === 'cancelled'
      ? messages.cancelled
      : props.status === 'confirmed'
      ? messages.confirmed
      : messages.pending;

  return (
    <Flex spacing={3} bgColor="gray.-120" rounded="lg" p={3} alignItems="center" w="full">
      <VStack spacing={0.5} alignItems="start">
        <TransactionCardAmount>
          {formatMoney({
            amount: props.amount,
            currency: props.currency,
          })}
        </TransactionCardAmount>
        {props.info ? <TransactionInfo>{props.info}</TransactionInfo> : null}
      </VStack>
      <Spacer />
      <VStack spacing={2} alignItems="end">
        <TransactionCardStatus type={getBadgeColor(props.status)}>
          <FormattedMessage {...statusMessage} />
        </TransactionCardStatus>
        {date ? <TransactionCardDate>{date}</TransactionCardDate> : null}
      </VStack>
    </Flex>
  );
};

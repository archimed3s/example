import { Stack, StackProps, Text, TextProps, VStack } from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { PlayerTransaction } from '@sharedTypes/api/player';

import { TransactionCard } from '../TransactionCard/TransactionCard';

const TransactionGroupHeader = (props: TextProps) => (
  <Text as="div" textStyle="s2" color="gray.120" px={3} {...props} />
);

const TransactionGroup = ({ children }: StackProps) => (
  <VStack w="full" spacing={2}>
    {children}
  </VStack>
);

const messages = defineMessages({
  pending: {
    id: 'TransactionsStack.pending',
    defaultMessage: 'Pending',
  },
  processed: {
    id: 'TransactionsStack.processed',
    defaultMessage: 'Processed',
  },
});

type Props = {
  isGrouped?: boolean;
  transactions: PlayerTransaction[];
};

export const TransactionsStack = (props: Props) => {
  const pendingTransactions = props.transactions.filter((t) => t.status === 'pending');
  const processedTransactions = props.transactions.filter((t) => t.status !== 'pending');

  const renderTransactionCard = (transaction: PlayerTransaction) => (
    <TransactionCard
      key={transaction.id}
      amount={transaction.amount}
      currency={transaction.currency}
      status={transaction.status}
      info={transaction.info}
      date={transaction.createdAt ? new Date(transaction.createdAt) : null}
    />
  );

  return (
    <Stack spacing={4}>
      {props.isGrouped && pendingTransactions.length && (
        <>
          <TransactionGroupHeader>
            <FormattedMessage {...messages.pending} />
          </TransactionGroupHeader>
          <TransactionGroup>{pendingTransactions.map(renderTransactionCard)}</TransactionGroup>
        </>
      )}
      {props.isGrouped && processedTransactions.length && (
        <>
          <TransactionGroupHeader>
            <FormattedMessage {...messages.processed} />
          </TransactionGroupHeader>
          <TransactionGroup>{processedTransactions.map(renderTransactionCard)}</TransactionGroup>
        </>
      )}
      {!props.isGrouped && <TransactionGroup>{props.transactions.map(renderTransactionCard)}</TransactionGroup>}
    </Stack>
  );
};

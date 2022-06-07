import { Box, Button, Skeleton, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { FormattedMessage, defineMessages } from 'react-intl';

import { Paper, PaperHeader } from '@components/PageLayout/PageLayout';

import { useTransactionsInfiniteQuery } from '../hooks/useTransactionsInfiniteQuery';
import { TransactionsStack } from './TransactionsStack';

const messages = defineMessages({
  noTransactions: {
    id: 'LastTransactions.noTransactions',
    defaultMessage: 'You have no transactions',
  },
  title: {
    id: 'LastTransactions.title',
    defaultMessage: 'Last transactions',
  },
  seeAll: {
    id: 'LastTransactions.seeAll',
    defaultMessage: 'See all transactions',
  },
});

export const LastTransactions = () => {
  const transactionsQuery = useTransactionsInfiniteQuery({
    limit: 5,
  });

  const transactions = transactionsQuery.data?.pages[0];
  const hasNoTransactions = transactions ? transactions.length === 0 : undefined;

  return (
    <Skeleton as={Paper} isLoaded={!transactionsQuery.isLoading} p={{ base: 3, lg: 6 }}>
      <Stack spacing={4}>
        <PaperHeader>
          <FormattedMessage {...messages.title} />
        </PaperHeader>
        {transactions ? <TransactionsStack transactions={transactions} isGrouped /> : null}
        {transactionsQuery.isLoading || hasNoTransactions ? (
          <Box textAlign="center">
            <FormattedMessage {...messages.noTransactions} />
          </Box>
        ) : (
          <Link href="/account/transactions" passHref>
            <Button variant="default" isFull>
              <FormattedMessage {...messages.seeAll} />
            </Button>
          </Link>
        )}
      </Stack>
    </Skeleton>
  );
};

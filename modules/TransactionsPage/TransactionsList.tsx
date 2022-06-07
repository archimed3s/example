import { Box, Button, Skeleton, Stack } from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { Paper } from '@components/PageLayout/PageLayout';
import { TransactionsStack } from '@modules/PlayerAccountPage/components/TransactionsStack';
import { useTransactionsInfiniteQuery } from '@modules/PlayerAccountPage/hooks/useTransactionsInfiniteQuery';

const messages = defineMessages({
  noTransactions: {
    id: 'TransactionsList.noTransactions',
    defaultMessage: 'No transactions found',
  },
  loadMore: {
    id: 'TransactionsList.loadMore',
    defaultMessage: 'Load more',
  },
});

type Props = {
  filter?: {
    type?: string;
    currency?: string;
    after?: Date;
  };
};

export const TransactionsList = (props: Props) => {
  const transactionsQuery = useTransactionsInfiniteQuery({
    limit: 5,
    filter: props.filter,
  });

  const hasNoTransactions = transactionsQuery.data ? transactionsQuery.data.pages[0].length === 0 : undefined;
  const isSinglePage = transactionsQuery.data ? transactionsQuery.data.pages.length === 1 : true;

  return (
    <Stack spacing={2}>
      <Paper>
        {transactionsQuery.isLoading || hasNoTransactions ? (
          <Box textAlign="center">
            <Skeleton isLoaded={!transactionsQuery.isLoading} as="span">
              <FormattedMessage {...messages.noTransactions} />
            </Skeleton>
          </Box>
        ) : null}
        <Stack spacing={2}>
          {transactionsQuery.data?.pages.map((page, index) => (
            <TransactionsStack key={index} transactions={page} isGrouped={isSinglePage} />
          ))}
        </Stack>
      </Paper>
      {transactionsQuery.hasNextPage ? (
        <Box textAlign="center">
          <Button
            variant="default"
            isDisabled={transactionsQuery.isFetching}
            onClick={() => transactionsQuery.fetchNextPage()}
          >
            <FormattedMessage {...messages.loadMore} />
          </Button>
        </Box>
      ) : null}
    </Stack>
  );
};

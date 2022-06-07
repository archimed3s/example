import { Skeleton, Table, TableCaption, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { Fragment } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { Button } from '@components/Button/Button';
import { TableWrapper } from '@components/Table/TableWrapper';

import { GameHistoryRow } from './GameHistoryRow';
import { useGameHistoryInfiniteQuery } from './useGameHistoryInfiniteQuery';

const messages = defineMessages({
  noHistory: {
    id: 'noHistory',
    defaultMessage: 'You have no game history for selected period',
  },
  loadMore: {
    id: 'loadMore',
    defaultMessage: 'Load more',
  },
});

type Props = {
  days: number;
  pageLimit: number;
};

export const GameHistoryTable = (props: Props) => {
  const intl = useIntl();

  const gameHistoryQuery = useGameHistoryInfiniteQuery({
    days: props.days,
    limit: props.pageLimit,
  });

  const playerHasNoHistory = gameHistoryQuery.data ? gameHistoryQuery.data.pages[0].length === 0 : undefined;

  return (
    <TableWrapper>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Game</Th>
            <Th>Date</Th>
            <Th isNumeric>Win</Th>
          </Tr>
        </Thead>

        <Tbody>
          {gameHistoryQuery.data?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.map((item) => (
                <GameHistoryRow key={item.txid} item={item} />
              ))}
            </Fragment>
          ))}
        </Tbody>

        {gameHistoryQuery.isLoading || playerHasNoHistory ? (
          <TableCaption>
            <Skeleton display="inline-block" isLoaded={!gameHistoryQuery.isLoading}>
              {intl.formatMessage(messages.noHistory)}
            </Skeleton>
          </TableCaption>
        ) : null}

        {gameHistoryQuery.hasNextPage ? (
          <TableCaption>
            <Button
              variant="default"
              isDisabled={gameHistoryQuery.isFetching}
              onClick={() => gameHistoryQuery.fetchNextPage()}
            >
              Load more
            </Button>
          </TableCaption>
        ) : null}
      </Table>
    </TableWrapper>
  );
};

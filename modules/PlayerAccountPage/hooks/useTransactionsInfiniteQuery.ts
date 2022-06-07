import { useInfiniteQuery } from 'react-query';

import { PlayerTransaction } from '@sharedTypes/api/player';
import { get } from '@utils/fetcher';

type FetchPlayerTransactionsFilter = {
  after?: Date;
  type?: string;
  currency?: string;
};

type FetchPlayerTransactionsProps = {
  limit: number;
  offset: number;
  filter?: FetchPlayerTransactionsFilter;
};

const fetchPlayerTransactions = (props: FetchPlayerTransactionsProps) => {
  const queryParams = new URLSearchParams({
    limit: String(props.limit),
    offset: String(props.offset),
  });

  if (props.filter?.after) {
    queryParams.append('after', props.filter?.after.toISOString());
  }

  if (props.filter?.type) {
    queryParams.append('type', props.filter?.type);
  }

  if (props.filter?.currency) {
    queryParams.append('currency', props.filter?.currency);
  }

  return get<PlayerTransaction[]>(`/api/player/transactions?${queryParams.toString()}`);
};

type Props = {
  limit: number;
  filter?: FetchPlayerTransactionsFilter;
};

export const useTransactionsInfiniteQuery = (props: Props) => {
  return useInfiniteQuery(
    ['playerTransactions', props.filter],
    (ctx) =>
      fetchPlayerTransactions(
        ctx.pageParam ?? {
          ...props,
          offset: 0,
        },
      ),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length >= props.limit
          ? {
              ...props,
              offset: allPages.length * props.limit,
            }
          : undefined,
    },
  );
};

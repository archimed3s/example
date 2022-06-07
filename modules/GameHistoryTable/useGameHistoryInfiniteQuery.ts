import { useInfiniteQuery } from 'react-query';

import { GameHistoryItem } from '@sharedTypes/api/player';
import { get } from '@utils/fetcher';

type FetchGameHistoryProps = {
  limit: number;
  offset: number;
  days: number;
};

const fetchGameHistory = (props: FetchGameHistoryProps) => {
  const queryParams = new URLSearchParams({
    limit: String(props.limit),
    offset: String(props.offset),
    days: String(props.days),
  });

  return get<GameHistoryItem[]>(`/api/player/gameHistory?${queryParams.toString()}`);
};

type Props = {
  limit: number;
  days: number;
};

export const useGameHistoryInfiniteQuery = (props: Props) => {
  return useInfiniteQuery(
    ['gameHistory', props.days],
    (ctx) =>
      fetchGameHistory(
        ctx.pageParam ?? {
          days: props.days,
          limit: props.limit,
          offset: 0,
        },
      ),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length >= props.limit
          ? {
              days: props.days,
              limit: props.limit,
              offset: allPages.length * props.limit,
            }
          : undefined,
    },
  );
};

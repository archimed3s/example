import { Td, Tr } from '@chakra-ui/react';
import Link from 'next/link';

import { routeService } from '@common/services/RouteService';
import { useCurrency } from '@hooks/useCurrency';
import { GameHistoryItem } from '@sharedTypes/api/player';

type GetGameHrefArgs = {
  id: number;
  provider: string;
  externalGameId: string;
};

const getGameHref = (game: GetGameHrefArgs) => {
  return routeService().getGamePagePath(game.provider, game.id, game.externalGameId);
};

const dateFormatter = new Intl.DateTimeFormat();

type Props = { item: GameHistoryItem };

export const GameHistoryRow = (props: Props) => {
  const currency = useCurrency();

  return (
    <Tr>
      <Td color="white">
        {props.item.game ? <Link href={getGameHref(props.item.game)}>{props.item.game.name}</Link> : null}
      </Td>

      <Td>{props.item.createdAt ? dateFormatter.format(new Date(props.item.createdAt)) : null}</Td>

      <Td isNumeric>
        {props.item.amount !== undefined
          ? currency.formatAmount(parseFloat(props.item.amount), props.item.currency)
          : null}
      </Td>
    </Tr>
  );
};

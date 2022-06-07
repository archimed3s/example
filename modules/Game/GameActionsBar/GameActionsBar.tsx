import { ChangeEvent } from 'react';

import { useBreakpoint } from '@hooks/useBreakpoint';
import { GameActionsBarDesktop } from '@modules/Game/GameActionsBar/GameActionsBarDesktop';
import { GameActionsBarMobile } from '@modules/Game/GameActionsBar/GameActionsBarMobile';
import { LobbyGameStartMode } from '@sharedTypes/Game';

type Props = {
  onFullScreen: () => void;
  onToggleGameMode: (isChecked: ChangeEvent<HTMLInputElement>) => void;
  dataTestId?: string;
  gameMode: LobbyGameStartMode;
  gameStartedAt: number;
};

export const GameActionsBar = (props: Props) => {
  const { isMobile } = useBreakpoint();
  return isMobile ? <GameActionsBarMobile {...props} /> : <GameActionsBarDesktop {...props} />;
};

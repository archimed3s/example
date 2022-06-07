import { StackProps, useBreakpointValue } from '@chakra-ui/react';

import { GameHeadingDesktop } from '@modules/Game/GameHeading/GameHeadingDesktop';
import { GameHeadingMobile } from '@modules/Game/GameHeading/GameHeadingMobile';
import { GameDetails } from '@sharedTypes/api/game';

type Props = {
  gameDetails?: GameDetails;
} & StackProps;

const useIsMobile = () => {
  const breakpoint = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md', lg: 'lg' });
  return breakpoint === 'base' || breakpoint === 'sm';
};

export const GameHeading = (props: Props) =>
  useIsMobile() ? <GameHeadingMobile {...props} /> : <GameHeadingDesktop {...props} />;

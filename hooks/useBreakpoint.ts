import { useBreakpointValue } from '@chakra-ui/react';

type UseBreakpointReturn = {
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
};

export const useBreakpoint = (): UseBreakpointReturn => {
  const breakpoint = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' });
  const isMobile = breakpoint === 'base' || breakpoint === 'sm';
  const isTablet = breakpoint === 'md';

  return { isMobile, isDesktop: !isMobile && !isTablet, isTablet };
};

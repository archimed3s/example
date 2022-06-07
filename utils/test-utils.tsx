import { ChakraProvider } from '@chakra-ui/react';
import { Queries, RenderOptions, queries, render as testingLibraryRender } from '@testing-library/react';
import { rest } from 'msw';
import { FC, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { PlayerStateReducerProvider } from '@hooks/usePlayerState/useStateReducer';
import { SiteSettingsContextProvider } from '@hooks/useSiteSettings';
import { IntlProvider } from '@modules/IntlProvider/IntlProvider';
import { Player } from '@sharedTypes/Player';

import { createFakePlayer } from '../__mocks__/createFakePlayer';
import { theme } from '../theme';

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              retry: false,
            },
          },
        })
      }
    >
      <ChakraProvider theme={theme}>
        <PlayerStateReducerProvider>
          <SiteSettingsContextProvider>
            <IntlProvider defaultLocale="en">{children}</IntlProvider>
          </SiteSettingsContextProvider>
        </PlayerStateReducerProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

const customRender = <Q extends Queries = typeof queries, Container extends Element | DocumentFragment = HTMLElement>(
  ui: ReactElement,
  options: RenderOptions<Q, Container> = {},
) => testingLibraryRender(ui, { wrapper: Providers, ...options });

const restAuthMeHandler = (props: Partial<Player> = {}) => {
  const meUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`;
  const player = createFakePlayer(props);
  return rest.get(meUrl, (req, res, ctx) => res(ctx.json(player)));
};

// re-export everything
// eslint-disable-next-line import/export
export * from '@testing-library/react';

// override render method
// eslint-disable-next-line import/export
export { customRender as render, restAuthMeHandler };

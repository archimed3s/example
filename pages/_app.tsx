import { ChakraProvider } from '@chakra-ui/react';
import { NextPageContext } from 'next';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { FastTrackConnectionProvider } from '@hooks/useFastTrackConnection';
import { PaymentContextProvider } from '@hooks/usePaymentContext';
import { PlayerStateProvider } from '@hooks/usePlayerState/useStateReducer';
import { useScrollRestoringOnRouteChange } from '@hooks/useScrollRestoringOnRouteChange';
import { SiteSettingsContextProvider } from '@hooks/useSiteSettings';
import { CheckinRegistrationProvider } from '@modules/CheckinRegistration/CheckinRegistration';
import { IntlProvider } from '@modules/IntlProvider/IntlProvider';
import { PaymentModal } from '@modules/PaymentModal';
import { PageWithMainLayoutType } from '@sharedTypes/PageWithLayout';
import { createQueryClient } from '@utils/query-client';

import { MainLayout, SCROLLABLE_AREA_ID } from '../layouts/MainLayout';
import { theme } from '../theme';

type AppPropsWithLayout = AppProps & {
  Component: PageWithMainLayoutType;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { locale, defaultLocale = 'en' } = useRouter();

  const queryClient = useRef(createQueryClient());
  const Layout = Component.layout || MainLayout;

  useScrollRestoringOnRouteChange(SCROLLABLE_AREA_ID);

  return (
    <>
      <DefaultSeo
        title="Test"
        description="Test"
        openGraph={{
          images: [
            {
              url: '/og-image.png',
              alt: 'Test',
            },
          ],
        }}
      />

      <QueryClientProvider client={queryClient.current}>
        <ReactQueryDevtools initialIsOpen={false} />

        <IntlProvider locale={locale} defaultLocale={defaultLocale}>
          <ChakraProvider theme={theme}>
            <Hydrate state={pageProps.dehydratedState}>
              <PlayerStateProvider currentPlayer={pageProps.player}>
                <SiteSettingsContextProvider>
                  <FastTrackConnectionProvider>
                    <PaymentContextProvider>
                      <CheckinRegistrationProvider>
                        <Layout>
                          <Component {...pageProps} />
                        </Layout>
                        <PaymentModal />
                      </CheckinRegistrationProvider>
                    </PaymentContextProvider>
                  </FastTrackConnectionProvider>
                </SiteSettingsContextProvider>
              </PlayerStateProvider>
            </Hydrate>
          </ChakraProvider>
        </IntlProvider>
      </QueryClientProvider>
    </>
  );
};

// Remove SSG from all pages during dynamic rendering
MyApp.getInitialProps = async ({ Component, ctx }: AppPropsWithLayout & { ctx: NextPageContext }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default MyApp;

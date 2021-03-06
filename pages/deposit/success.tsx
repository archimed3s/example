import { Center, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { useRouteService } from '@common/services/RouteService';
import { GLink } from '@components/GLink/GLink';
import { usePaymentModal } from '@hooks/usePaymentContext';

import { EmptyLayout } from '../../layouts/EmptyLayout';

const messages = defineMessages({
  redirecting: {
    id: 'Payment.redirecting',
    defaultMessage: 'Redirecting...',
  },
  clickHere: {
    id: 'Payment.clickHere',
    defaultMessage: "If it's not happened, click {here}",
  },
  here: {
    id: 'Payment.here',
    defaultMessage: 'here',
  },
});

const Success = () => {
  const router = useRouter();
  const routes = useRouteService();
  const { openSuccess } = usePaymentModal();

  useEffect(() => {
    if (!window.frameElement) {
      router.push(routes.getHomePagePath());
    }
    openSuccess('deposit', Number(router.query.a));
  }, [openSuccess, router, routes]);

  return (
    <Center height="100vh" flexDirection="column">
      <Text>
        <FormattedMessage {...messages.redirecting} />
      </Text>
      <Text>
        <FormattedMessage
          {...messages.clickHere}
          values={{
            here: (
              <GLink href={routes.getHomePagePath()}>
                <FormattedMessage {...messages.here} />
              </GLink>
            ),
          }}
        />
      </Text>
    </Center>
  );
};

Success.layout = EmptyLayout;

export default Success;

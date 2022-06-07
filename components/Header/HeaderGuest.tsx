import { Button, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FormattedMessage } from 'react-intl';

import { useRouteService } from '@common/services/RouteService';
import { useRegistration } from '@hooks/useRegistration';

import { messages } from './translations';

export const HeaderGuest = () => {
  const appRoutes = useRouteService();
  const { onOpen } = useRegistration();

  return (
    <HStack spacing={{ base: 2, md: 3 }} data-testid="header-guest">
      <Button onClick={onOpen} data-testid="register-button">
        <FormattedMessage {...messages.register} />
      </Button>
      <NextLink href={appRoutes.getSignInPagePath()} passHref>
        <Button as="a" variant="outline" data-testid="signin-button">
          <FormattedMessage {...messages.logIn} />
        </Button>
      </NextLink>
    </HStack>
  );
};

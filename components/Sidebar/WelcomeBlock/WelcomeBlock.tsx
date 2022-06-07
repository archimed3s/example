import { Box, CSSObject, HStack, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FormattedMessage } from 'react-intl';

import { useRouteService } from '@common/services/RouteService';
import { Button } from '@components/Button/Button';
import { messages } from '@components/Sidebar/translations';
import { useRegistration } from '@hooks/useRegistration';

type WelcomeBlockProps = {
  isSidebarOpen: boolean;
};

const containerStyles: CSSObject = {
  background:
    'radial-gradient(61.49% 116.45% at 26.01% 77.46%, rgba(107, 0, 255, 0.2) 0%, rgba(107, 0, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(309.44deg, #1D2234 0%, rgba(40, 47, 72, 0.34) 34.74%, rgba(51, 59, 91, 0.16) 68.08%);',
};

export const WelcomeBlock = ({ isSidebarOpen }: WelcomeBlockProps) => {
  const appRoutes = useRouteService();
  const { onOpen } = useRegistration();

  return (
    <Box
      w="100%"
      sx={containerStyles}
      display={isSidebarOpen ? 'block' : 'none'}
      pt={3}
      pb={4}
      px={4}
      mb={{ base: 5, md: 4 }}
      borderRadius={8}
      shadow="b1"
    >
      <Heading as="h4" size="s2" mb="2" color="white">
        <FormattedMessage {...messages.welcome} />
      </Heading>
      <HStack spacing={{ base: 5, md: 3 }} justifyContent="space-between">
        <Button variant="primary" size="md" onClick={onOpen}>
          <FormattedMessage {...messages.register} />
        </Button>
        <NextLink href={appRoutes.getSignInPagePath()} passHref>
          <Button variant="outline" size="md" as="a">
            <FormattedMessage {...messages.logIn} />
          </Button>
        </NextLink>
      </HStack>
    </Box>
  );
};

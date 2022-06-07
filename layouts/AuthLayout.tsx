import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { useQuery } from 'react-query';

import { QUERY_KEYS, loadLoginPageConfig } from '@api/storyblok';
import { useRouteService } from '@common/services/RouteService';
import { LoginHeader } from '@modules/LoginPage/components/LoginHeader';
import { SideBanner } from '@modules/LoginPage/components/SideBanner';

export const AuthLayout: FC = ({ children }) => {
  const appRoutes = useRouteService();
  const { data } = useQuery(QUERY_KEYS.loginPageConfig, loadLoginPageConfig);
  return (
    <Flex minWidth="100%" height="100vh">
      <Box minWidth="35%" height="100vh" display={{ base: 'none', md: 'block' }}>
        {data && <SideBanner image={data.sideImage} text={data.description} />}
      </Box>
      <Flex minWidth={{ base: 'auto', md: '65%' }} height="100vh" flexDirection="column">
        <Box display={{ base: 'none', md: 'block' }}>
          <LoginHeader items={data?.headerImages ?? []} />
        </Box>
        <Flex
          minWidth={500}
          mt={{ base: 50, md: 150 }}
          px={{ base: 8, md: 'auto' }}
          alignSelf="center"
          flexDirection="column"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

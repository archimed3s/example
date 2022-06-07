import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';

import { useRouteService } from '@common/services/RouteService';
import { NotFoundIcon } from '@components/NotFoundIcon/NotFoundIcon';

const Page404 = () => {
  const appRoutes = useRouteService();
  return (
    <Box
      height="100vh"
      width="100%"
      maxWidth="inherit"
      display="flex"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      padding="0 10px"
    >
      <NotFoundIcon />
      <Text textAlign={['center']} fontWeight="600" fontSize="20" marginTop="1.5rem">
        You’re lost, my friend.
        <Link href={appRoutes.getHomePagePath()} passHref>
          <Box as="a" color="#6f2ae6" textDecoration="none" marginLeft="5px">
            Go back home
          </Box>
        </Link>
      </Text>
    </Box>
  );
};

export default Page404;

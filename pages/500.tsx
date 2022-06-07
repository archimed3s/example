import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';

import { useRouteService } from '@common/services/RouteService';

const Page500 = () => {
  const appRoutes = useRouteService();

  return (
    <Box
      position="absolute"
      top="0"
      height="100vh"
      width="100%"
      maxWidth="inherit"
      display="flex"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      padding="0 10px"
    >
      <Text textAlign={['center']} fontWeight="600" fontSize="20" marginTop="1.5rem">
        500 Internal Server Error
        <Link href={appRoutes.getHomePagePath()} passHref>
          <Box as="a" color="#6f2ae6" textDecoration="none" paddingLeft="5px">
            Go back home page
          </Box>
        </Link>
      </Text>
    </Box>
  );
};

export default Page500;

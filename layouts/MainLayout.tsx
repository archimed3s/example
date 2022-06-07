import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { Sidebar } from '@components/Sidebar/Sidebar';

type MainLayoutProps = {
  children: ReactNode;
  beforeContainerChild?: ReactNode;
};

export const SCROLLABLE_AREA_ID = 'scrollable-area';

export const MainLayout = ({ children, beforeContainerChild }: MainLayoutProps) => {
  return (
    <Grid
      h="100vh"
      templateAreas="'sidebar header' 'sidebar main'"
      templateColumns="auto 1fr"
      templateRows="80px calc(100vh - 120px)"
      bg="gray.-140"
    >
      <GridItem gridArea="header">
        <Header />
      </GridItem>
      <GridItem gridArea="sidebar">
        <Sidebar />
      </GridItem>
      <GridItem gridArea="main" overflow="auto" id={SCROLLABLE_AREA_ID} borderRadius="24px" mr={{ base: 0, xl: 5 }}>
        <Box as="main" bg={{ base: 'transparent', xl: 'gray.-160' }} borderRadius="24px" minH="100%">
          {beforeContainerChild}
          <Container px={5} maxW="1280px" centerContent>
            {children}
          </Container>
        </Box>
        <Footer />
      </GridItem>
    </Grid>
  );
};

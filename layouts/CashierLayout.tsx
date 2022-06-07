import { Grid, GridItem, HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Breadcrumb } from '@components/Breadcrumb/Breadcrumb';
import { PageControls, PageHeader, PageTitle, PageWrapper } from '@components/PageLayout/PageLayout';

type CashierLayoutProps = {
  title?: string;
  titleImage?: ReactNode;
  controls?: ReactNode;
  mainContent: ReactNode;
  sidebarContent?: ReactNode;
};

export const CashierLayout = ({ title, titleImage, controls, mainContent, sidebarContent }: CashierLayoutProps) => (
  <PageWrapper>
    <Breadcrumb mb={4} />
    <PageHeader mb={8}>
      <HStack spacing={2}>
        {titleImage}
        <PageTitle>{title}</PageTitle>
      </HStack>
      {controls && <PageControls>{controls}</PageControls>}
    </PageHeader>
    <Grid
      templateColumns={{
        md: '2fr 1fr',
        base: '1fr',
      }}
      gap={{
        lg: 36,
        md: 12,
        base: 6,
      }}
      pt={8}
    >
      <GridItem width="100%">{mainContent}</GridItem>
      {sidebarContent && <GridItem width="100%">{sidebarContent}</GridItem>}
    </Grid>
  </PageWrapper>
);

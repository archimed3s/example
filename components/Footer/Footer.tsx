import { Grid, useBreakpointValue } from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { useQuery } from 'react-query';

import { useBreakpoint } from '@hooks/useBreakpoint';

import { FooterCopyright } from './FooterCopyright';
import { FooterLicense } from './FooterLicense';
import { FooterPartners } from './FooterPartners';
import { Links } from './Links';
import { fetchFooterConfig, fetchStoriesByUuid } from './storyblokUtils';

const messages = defineMessages({
  company: {
    id: 'Footer.company',
    defaultMessage: 'Company',
  },
  other: {
    id: 'Footer.other',
    defaultMessage: 'Other',
  },
});

export const Footer = () => {
  const { isMobile } = useBreakpoint();
  const { gridTemplate, gridTemplateColumns } =
    useBreakpointValue({
      base: {
        gridTemplate: "'logos logos' 'company other' 'copyright copyright'",
        gridTemplateColumns: '1fr 1fr',
      },
      md: {
        gridTemplate: "'logos logos logos logos logos' 'copyright copyright company other license'",
        gridTemplateColumns: 'repeat(2, 23%) repeat(3, 1fr)',
      },
    }) ?? {};

  const { data: footerConfig, isSuccess } = useQuery('footerConfig', fetchFooterConfig);
  const { data: linkedStories } = useQuery(
    'footerLinkedStories',
    async () => {
      const stories = await fetchStoriesByUuid([...(footerConfig?.company ?? []), ...(footerConfig?.other ?? [])]);
      return {
        company: stories.filter(({ uuid }) => footerConfig?.company.includes(uuid)),
        other: stories.filter(({ uuid }) => footerConfig?.other.includes(uuid)),
      };
    },
    {
      enabled: isSuccess,
    },
  );

  return (
    <Grid
      as="footer"
      data-testid="footer"
      color="gray.160"
      width="min(100%, 1265px)"
      templateAreas={gridTemplate}
      gridTemplateColumns={gridTemplateColumns}
      gridColumnGap={{ base: 3, md: 12 }}
      gridRowGap={{ base: 4, md: 12 }}
      marginX="auto"
      paddingTop={{ base: 5, lg: 14 }}
      paddingBottom={5}
      paddingX={5}
    >
      <FooterPartners gridArea="logos" partners={footerConfig?.assets} />
      <FooterCopyright gridArea="copyright" data={footerConfig} />
      <Links gridArea="company" links={linkedStories?.company}>
        <FormattedMessage {...messages.company} />
      </Links>
      <Links gridArea="other" links={linkedStories?.other}>
        <FormattedMessage {...messages.other} />
      </Links>
      {!isMobile && <FooterLicense isLoading={!footerConfig} gridArea="license" />}
    </Grid>
  );
};

import { Flex, Stack, StackProps } from '@chakra-ui/react';
import { defineMessages, useIntl } from 'react-intl';

import { SectionHeader } from '@components/SectionHeader/SectionHeader';
import { ThemeCard, ThemeCardProps } from '@components/ThemeCard/ThemeCard';

const messages = defineMessages({
  title: {
    id: 'ThemeCards.SectionHeader.headerTitle',
    defaultMessage: 'Theme',
  },
});

const cards: ThemeCardProps[] = [
  {
    id: '1',
    titleText: 'Adventure',
    subText: '1540 GAMES',
    href: '#',
    variant: 'purple',
  },
  {
    id: '2',
    titleText: 'Adventure',
    subText: '1540 GAMES',
    href: '#',
    variant: 'coral',
  },
  {
    id: '3',
    titleText: 'Adventure',
    subText: '1540 GAMES',
    href: '#',
    variant: 'blue',
  },
];

export const ThemeCards = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack {...props}>
      <SectionHeader headerTitle={intl.formatMessage(messages.title)} />
      <Flex>
        <Flex flexWrap="wrap" justify="space-between" mt="4" w="100%" sx={{ gap: '1rem' }}>
          {cards.map(({ id, titleText, subText, href, variant }) => (
            <ThemeCard key={id} id={id} titleText={titleText} subText={subText} href={href} variant={variant} />
          ))}
        </Flex>
      </Flex>
    </Stack>
  );
};

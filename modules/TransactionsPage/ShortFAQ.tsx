import {
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  Stack,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { defineMessages, useIntl } from 'react-intl';

import { AccordionButton } from '@components/Accordion/AccordionButton';
import { Paper, PaperContent, PaperHeader } from '@components/PageLayout/PageLayout';

import faqIcon from './static/faqIcon.png';
import { useTransactionsPageStoryContentQuery } from './useTransactionsPageStoryContentQuery';

const messages = defineMessages({
  faqBtn: {
    id: 'FAQ.button',
    defaultMessage: `See all FAQ's`,
  },
  faqTitle: {
    id: 'FAQ.title',
    defaultMessage: 'FAQ',
  },
});

export const ShortFAQ = () => {
  const { formatMessage } = useIntl();
  const contentQuery = useTransactionsPageStoryContentQuery();

  return (
    <Skeleton as={Paper} isLoaded={!contentQuery.isLoading} p={{ base: 3, lg: 6 }}>
      <VStack spacing={4}>
        <Stack spacing={2}>
          <HStack spacing={2}>
            <Image height="36px" width="36px" src={faqIcon.src} alt="FAQ" />
            <PaperHeader>{formatMessage(messages.faqTitle)}</PaperHeader>
          </HStack>
          {contentQuery.data?.faq_description ? (
            <PaperContent>{contentQuery.data?.faq_description}</PaperContent>
          ) : null}
        </Stack>
        <Accordion size="sm">
          {contentQuery.data?.faq_blocks.map((block) => (
            <AccordionItem key={block._uid} bgColor="gray.-120">
              <AccordionButton>
                <Box textAlign="left">{block.title}</Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>{block.content}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        <Link href="/faq" passHref>
          <Button variant="default" isFullWidth>
            {formatMessage(messages.faqBtn)}
          </Button>
        </Link>
      </VStack>
    </Skeleton>
  );
};

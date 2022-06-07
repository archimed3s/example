import * as t from 'io-ts';
import { useQuery } from 'react-query';

import { Storyblok } from '@lib/storyblok/storyblok';

const FAQBlock = t.strict({
  _uid: t.string,
  title: t.string,
  content: t.string,
});

const TransactionsPageStoryContent = t.strict({
  faq_description: t.string,
  faq_blocks: t.array(FAQBlock),
});

const fetchTransactionsPageStory = async () => {
  const content = (await Storyblok.getStory('account/transactions')).data.story.content;

  return TransactionsPageStoryContent.is(content) ? content : undefined;
};

export const useTransactionsPageStoryContentQuery = () =>
  useQuery(['transactionsPageStory'], fetchTransactionsPageStory);

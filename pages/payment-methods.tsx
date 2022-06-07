import { GetServerSideProps } from 'next';

import { error } from '@common/services/LogService';
import { Storyblok } from '@lib/storyblok/storyblok';
import { PaymentMethodsPage } from '@modules/PaymentMethods/PaymentMethodsPage';
import { StoryblokRichText } from '@sharedTypes/api/storyblok';

type PageProps = {
  story: StoryblokRichText;
};

const PaymentMethods = ({ story }: PageProps) => {
  return <PaymentMethodsPage story={story} />;
};

export default PaymentMethods;

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ preview = false, locale }) => {
  const sbParams = {
    version: preview ? ('draft' as const) : undefined,
    language: locale,
  };
  const { data } = await Storyblok.getStory(`legal/payment-methods`, sbParams);

  if (!data?.story) {
    error(`Slug payment-methods story or content type is not found`, { data });
    return {
      notFound: true,
    };
  }

  return {
    props: {
      story: data.story.content.rich_text,
      preview,
    },
  };
};

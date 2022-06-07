import { Flex, Image, Link, Spacer, Text } from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { onSupportChatOpen } from '@common/services/SupportChat';
import { Button } from '@components/Button/Button';

import image from './live-chat-image.png';

const messages = defineMessages({
  title: {
    id: 'ContactForm.LiveChat.title',
    defaultMessage: 'Live Chat',
  },
  text: {
    id: 'ContactForm.LiveChat.text',
    defaultMessage: 'test',
  button: {
    id: 'ContactForm.LiveChat.button',
    defaultMessage: 'Live Chat',
  },
});

export const LiveChatSection = () => {
  const onLiveChatClick = () => {
    onSupportChatOpen();
  };

  return (
    <Flex
      bg="gray.-120"
      bgGradient="radial(gradientBlue.10 0%, gradientBlue.20 100%)"
      h="100%"
      borderRadius="16px"
      px={6}
      py={4}
      flexDirection="column"
    >
      <Flex justifyContent="center" pb={6} pt={4}>
        <Image src={image.src} h="90px" />
      </Flex>
      <Text textStyle="md" color="white" textAlign="center" fontWeight="semibold" pb={2}>
        <FormattedMessage {...messages.title} />
      </Text>
      <Text textStyle="paragraph" color="white" px={5}>
        <FormattedMessage
          {...messages.text}
          values={{
            b: (chunks: string) => (
              <Link color="wildBlue.70" href="mailto:test@test.com">
                {chunks}
              </Link>
            ),
          }}
        />
      </Text>

      <Spacer />

      <Button w="full" variant="support" onClick={onLiveChatClick}>
        <FormattedMessage {...messages.button} />
      </Button>
    </Flex>
  );
};

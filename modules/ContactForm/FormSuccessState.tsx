import { Flex, Image, Text } from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';

import successIcon from './assets/success-icon.png';

type FormSuccessStateProps = {
  email: string;
};

const messages = defineMessages({
  successTitle: {
    id: 'ContactForm.successTitle',
    defaultMessage: 'Thank you!',
  },
  successSubtitle: {
    id: 'ContactForm.successSubtitle',
    defaultMessage: 'You can view your feedback in your email {email}',
  },
});

export const FormSuccessState = ({ email }: FormSuccessStateProps) => (
  <Flex
    pos="absolute"
    bg="gray.-80"
    zIndex={3}
    right={0}
    left={0}
    top={0}
    bottom={0}
    borderRadius="16px"
    justifyContent="center"
    alignItems="center"
    direction="column"
  >
    <Image src={successIcon.src} pb={6} w="114px" />
    <Text textStyle="md" color="white" fontWeight="semibold">
      <FormattedMessage {...messages.successTitle} />
    </Text>
    <Text color="whiteAlpha.90" maxW="290px" textAlign="center">
      <FormattedMessage
        {...messages.successSubtitle}
        values={{
          email: (
            <Text color="gradientBlue.0" as="span">
              {email}
            </Text>
          ),
        }}
      />
    </Text>
  </Flex>
);

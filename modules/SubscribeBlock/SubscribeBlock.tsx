import { Input, InputGroup, InputRightElement, chakra } from '@chakra-ui/react';
import { defineMessages, useIntl } from 'react-intl';

import { Banner } from '@components/Banner/Banner';
import { Button } from '@components/Button/Button';
import { useRegistration } from '@hooks/useRegistration';

type Props = {
  action: 'subscribe' | 'register';
  title: string;
  description: string;
};

const EmailInput = chakra(Input, {
  baseStyle: ({ theme }) => ({
    size: 'md',
    // we need to have the same style as for button
    borderRadius: theme.components.Button.baseStyle.borderRadius,
    padding: theme.components.Button.baseStyle.padding,
    lineHeight: theme.components.Button.baseStyle.lineHeight,
    _placeholder: {
      fontSize: '1rem',
      lineHeight: '1.625rem',
      color: 'whiteTransparent.60',
    },
    focusBorderColor: 'auto',
  }),
});

const messages = defineMessages({
  inputPlaceholder: {
    id: 'SubscribeBlock.inputPlaceholder',
    defaultMessage: 'Enter your email',
  },
  buttonCaption: {
    id: 'SubscribeBlock.buttonCaption',
    defaultMessage: 'Subscribe now',
  },
  registerButton: {
    id: 'SubscribeBlock.registerButton',
    defaultMessage: 'Create new account',
  },
});

export const SubscribeBlock = (props: Props) => {
  const intl = useIntl();

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const registration = useRegistration();

  return (
    <Banner bannerTitle={props.title} bannerText={props.description}>
      {props.action === 'subscribe' ? (
        <form onSubmit={handleFormSubmit}>
          <InputGroup>
            <EmailInput id="subscribe" placeholder={intl.formatMessage(messages.inputPlaceholder)} />
            <InputRightElement>
              <Button variant="security" type="submit">
                {intl.formatMessage(messages.buttonCaption)}
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
      ) : (
        <Button variant="security" onClick={registration.onOpen}>
          {intl.formatMessage(messages.registerButton)}
        </Button>
      )}
    </Banner>
  );
};

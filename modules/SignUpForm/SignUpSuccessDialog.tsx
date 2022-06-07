import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

import signUpSuccessIcon from './static/signUpSuccessIcon.png';

const messages = defineMessages({
  welcome: {
    id: 'SignUpSuccessDialog.welcome',
    defaultMessage: 'Welcome to Test',
  },
  confirmRequest: {
    id: 'SignUpSuccessDialog.confirmRequest',
    defaultMessage:
      'Please, confirm your email to validate your account within 48 hours after registration. By confirming your email you will get full access to the site and offers.',
  },
  confirmButton: {
    id: 'SignUpSuccessDialog.confirmButton',
    defaultMessage: 'OK',
  },
});

type Props = Omit<AlertDialogProps, 'leastDestructiveRef' | 'children'>;

export const SignUpSuccessDialog = (props: Props) => {
  const confirmRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog leastDestructiveRef={confirmRef} {...props}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogCloseButton />
        <AlertDialogHeader>
          <Image
            margin="0 auto"
            width="114px"
            height="85px"
            marginTop={8}
            src={signUpSuccessIcon.src}
            alt="Sign up was successfully"
          />
        </AlertDialogHeader>
        <AlertDialogBody>
          <Stack textAlign="center">
            <Text textStyle="md2" color="white">
              <FormattedMessage {...messages.welcome} />
            </Text>
            <Text>
              <FormattedMessage {...messages.confirmRequest} />
            </Text>
          </Stack>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={confirmRef} width="full" onClick={props.onClose} data-testid="signup-lets-go">
            <FormattedMessage {...messages.confirmButton} />
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

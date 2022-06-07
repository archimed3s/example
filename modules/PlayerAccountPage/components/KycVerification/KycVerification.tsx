import { Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { Button } from '@components/Button/Button';
import { ValidIcon } from '@modules/PlayerAccountPage/assets/ValidIcon';
import { KycProvider } from '@sharedTypes/Player';

import { ManualAuthProps } from './ManualAuth';
import { VeriffAuthProps } from './VeriffAuth';

const ManualAuth = dynamic<ManualAuthProps>(() => import('./ManualAuth').then((m) => m.ManualAuth), { ssr: false });
const VeriffAuth = dynamic<VeriffAuthProps>(() => import('./VeriffAuth').then((m) => m.VeriffAuth), { ssr: false });

type KycVerificationProps = {
  isSubmitted: boolean;
  isVerified: boolean;
  kycProviderId?: number;
};

const messages = defineMessages({
  completeVerification: {
    id: 'User.completeVerification',
    defaultMessage: 'Complete Verification',
  },
  verificationSubmitted: {
    id: 'User.verificationSubmitted',
    defaultMessage: 'Verification Request Submitted',
  },
  verificationCompleted: {
    id: 'User.verificationCompleted',
    defaultMessage: 'Verification Complete',
  },
  veriffUnavailableToast: {
    id: 'User.veriffUnavailableToast',
    defaultMessage: 'Sorry, the verification service is currently unavailable',
  },
});

export const KycVerification: FC<KycVerificationProps> = ({ isSubmitted, isVerified, kycProviderId }) => {
  const { formatMessage } = useIntl();

  if (isSubmitted) {
    return (
      <Button variant="security" isFullWidth disabled>
        {formatMessage(messages.verificationSubmitted)}
      </Button>
    );
  }

  if (isVerified) {
    return (
      <Text
        as="span"
        fontSize="md"
        fontWeight="600"
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <ValidIcon />
        {formatMessage(messages.verificationCompleted)}
      </Text>
    );
  }

  return kycProviderId === KycProvider.VERIFF ? <VeriffAuth messages={messages} /> : <ManualAuth messages={messages} />;
};

import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { MESSAGES, createVeriffFrame } from '@veriff/incontext-sdk';
import getConfig from 'next/config';
import { FC, useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { usePlayerState } from '@hooks/usePlayerState';
import { useToast } from '@hooks/useToast';
import { KycVerificationMessages } from '@sharedTypes/Player';

const { publicRuntimeConfig } = getConfig();

const StyledBox = styled(Box)`
  width: 100%;
  input {
    outline: 2px solid transparent;
    outline-offset: 2px;
    line-height: 1.2;
    border-radius: var(--chakra-radii-lg);
    font-weight: var(--chakra-fontWeights-semibold);
    transition-property: var(--chakra-transition-property-common);
    transition-duration: var(--chakra-transition-duration-normal);
    height: var(--chakra-sizes-10);
    min-width: var(--chakra-sizes-10);
    font-size: var(--chakra-fontSizes-md);
    padding-inline-start: var(--chakra-space-4);
    padding-inline-end: var(--chakra-space-4);
    background: var(--chakra-colors-whiteAlpha-200);
    background-image: linear-gradient(to left, #f3d227, #e57b2e);
    text-transform: capitalize;
    border: none;
    &:hover {
      background: var(--chakra-colors-whiteAlpha-300);
      transform: none;
    }
    &[disabled] {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: var(--chakra-shadows-none);
      &:hover {
        background: var(--chakra-colors-whiteAlpha-200);
      }
    }
  }
  p {
    display: none;
  }
`;

const enum ElementIds {
  ROOT = 'veriff-root',
  SUBMIT_BTN = 'veriff-submit-btn',
}

export type VeriffAuthProps = {
  messages: KycVerificationMessages;
};

export const VeriffAuth: FC<VeriffAuthProps> = ({ messages }) => {
  const toast = useToast();
  const { formatMessage } = useIntl();
  const { player } = usePlayerState();

  const { firstName, lastName, externalPlayerId } = player || {};

  const initVeriff = useCallback(async () => {
    const { Veriff } = await import('@veriff/js-sdk');

    const veriff = Veriff({
      apiKey: publicRuntimeConfig.veriffApiKey || '',
      parentId: ElementIds.ROOT,
      onSession: (err, res) => {
        if (err) {
          toast.error({
            title: formatMessage(messages.veriffUnavailableToast),
          });
        } else {
          createVeriffFrame({
            url: res.verification.url,
            onEvent: (msg) => {
              switch (msg) {
                case MESSAGES.FINISHED: {
                  const btn = document.getElementById(ElementIds.SUBMIT_BTN);

                  btn?.setAttribute('disabled', 'disabled');
                  btn?.setAttribute('value', formatMessage(messages.verificationSubmitted));

                  break;
                }
                case MESSAGES.STARTED:
                case MESSAGES.CANCELED:
                default:
                  break;
              }
            },
          });
        }
      },
    });
    veriff.setParams({
      person: {
        givenName: firstName as string,
        lastName: lastName as string,
      },
      vendorData: externalPlayerId,
    });
    veriff.mount({
      submitBtnText: formatMessage(messages.completeVerification),
    });
  }, [firstName, lastName, externalPlayerId, formatMessage, messages, toast]);

  useEffect(() => {
    if (player) {
      initVeriff();
    }
  }, [player, initVeriff]);

  return <StyledBox id={ElementIds.ROOT} />;
};

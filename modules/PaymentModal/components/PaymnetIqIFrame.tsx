import { Box } from '@chakra-ui/react';
import { PropsWithRef, useCallback, useEffect, useRef, useState } from 'react';

import { log } from '@common/services/LogService';
import { PaymentIQDepositResponseUrl } from '@lib/payment-client';

type PaymentIqIFrameProps = PropsWithRef<{
  paymentIqParams: PaymentIQDepositResponseUrl;
  onSuccess: () => void;
  onError: () => void;
}>;
export const PaymentIqIFrame = ({ paymentIqParams, onSuccess, onError }: PaymentIqIFrameProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [parentHeight, setParentHeight] = useState<string | number | undefined>();

  useEffect(() => {
    formRef.current?.submit();
    const receiveMessage = (e: MessageEvent) => {
      if (e.data === 'success') {
        onSuccess();
      } else {
        log('Error loading paymentIq iframe', { msg: e });
        onError();
      }
    };
    window.addEventListener('message', receiveMessage, false);
    return () => window.removeEventListener('message', receiveMessage);
  }, [onError, onSuccess]);

  const iframeHeight = useCallback((node: HTMLDivElement | null | undefined) => {
    if (node?.parentElement) {
      setParentHeight(window.getComputedStyle(node.parentElement).height);
    }
  }, []);

  const { url, parameters, method } = paymentIqParams;

  return (
    <Box data-testid="iframe" width="full" height="full" ref={iframeHeight}>
      <form ref={formRef} action={url} method={method} target="provider-iframe">
        {Object.entries(parameters ?? {}).map(([key, value]) => (
          <input key={key} type="hidden" name={key} defaultValue={value} />
        ))}
      </form>
      <iframe name="provider-iframe" height={parentHeight} width="100%" />
    </Box>
  );
};

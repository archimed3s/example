import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { QUERY_KEYS, fetchPaymentiqConfig } from '@api/deposit';

declare global {
  interface Window {
    encryptData: (str: string) => string;
  }
}

const ENCRYPT_SCRIPT_ID = 'jscardencrypter';
const ENCRYPTER_PATH = `/api/viq/jscardencrypter/`; // [Doc](https://docs.paymentiq.io/europe/front/general/encryption#Layer_1)

export const usePaymentIqScript = () => {
  const [scriptState, setScriptState] = useState<'waiting' | 'success' | 'error'>('waiting');
  const [enableConfigFetch, setEnableConfigFetch] = useState(false);
  const { isError, isLoading, data } = useQuery([QUERY_KEYS.paymentiqConfig], fetchPaymentiqConfig, {
    enabled: enableConfigFetch,
  });

  useEffect(() => {
    if (!document.getElementById(ENCRYPT_SCRIPT_ID)) {
      return setEnableConfigFetch(true);
    }
    if (!window.encryptData) {
      return setScriptState('error');
    }
  }, []);

  const encryptCardData = useCallback((str: string): string => window.encryptData?.(str) ?? '', []);

  const PaymentIqScript = () =>
    !data ? null : (
      <Script
        id={ENCRYPT_SCRIPT_ID}
        src={`${data.apiUrl}${ENCRYPTER_PATH}${data.merchantId}`}
        onLoad={() => setScriptState(!window.encryptData ? 'error' : 'success')}
        onError={() => setScriptState('error')}
      />
    );

  return { isLoading, isError: isError || scriptState, PaymentIqScript, encryptCardData };
};

/**
 * @deprecated
 * use next/script instead
 */
import { useEffect, useState } from 'react';

type Hook = (props: { url: string; onSuccess?: () => void }) => { isLoading: boolean; isError: boolean };

export const useExternalScript: Hook = ({ url, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(!!url);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) {
      return;
    }

    let script: HTMLScriptElement | null = document.querySelector(`script[src="${url}"]`);

    if (script) {
      setIsLoading(false);
      return;
    }

    const handleScript = (e: Event) => {
      if (e.type === 'load') {
        setIsLoading(false);
        onSuccess && onSuccess();
      }
      e.type !== 'load' && setIsError(true);
    };

    script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = url;
    script.setAttribute('data-testid', 'external-script');
    script.async = true;
    document.body.appendChild(script);
    script.addEventListener('load', handleScript);
    script.addEventListener('error', handleScript);

    script.addEventListener('load', handleScript);
    script.addEventListener('error', handleScript);

    return () => {
      script?.removeEventListener('load', handleScript);
      script?.removeEventListener('error', handleScript);
    };
  }, [onSuccess, url]);

  return { isLoading, isError };
};

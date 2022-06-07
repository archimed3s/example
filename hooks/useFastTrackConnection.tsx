import Script from 'next/script';
import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from 'react';

import { log } from '@common/services/LogService';
import { usePlayerState } from '@hooks/usePlayerState';
import { useSiteSettings } from '@hooks/useSiteSettings';
import noop from '@utils/noop';

type FastTrackContext = {
  isConnected: boolean;
  disconnect: () => void;
};

const scriptSrc = 'https://crm-lib.fasttrack-solutions.com/loader/fasttrack-crm.js';

const FastTrackConnectionContext = createContext<FastTrackContext>({ isConnected: false, disconnect: noop });

declare class FasttrackCrm {
  logout(): void;
}

declare global {
  interface Window {
    sid: string;
    fasttrackbrand: string;
    FastTrackLoader: new () => void;
    FasttrackCrm: FasttrackCrm;
  }
}

export const FastTrackConnectionProvider = ({ children }: PropsWithChildren<object>) => {
  const [isConnected, setIsConnected] = useState(false);

  const { player } = usePlayerState();
  const settings = useSiteSettings();

  const onLoad = useCallback(() => {
    setIsConnected(true);
    log('FastTrackConnectionProvider connected');
    // eslint-disable-next-line no-new
    new window.FastTrackLoader();
  }, []);

  const disconnect = useCallback(() => {
    if (isConnected && window.FasttrackCrm) {
      window.FasttrackCrm.logout();
    }
  }, [isConnected]);

  useEffect(() => {
    if (player?.externalToken) {
      window.sid = player.externalToken;
    }
  }, [player]);

  useEffect(() => {
    if (settings?.id) {
      window.fasttrackbrand = settings.id;
    }
  }, [settings?.id]);

  return (
    <FastTrackConnectionContext.Provider
      value={{
        isConnected,
        disconnect,
      }}
    >
      {settings?.id && player?.externalToken && <Script src={scriptSrc} onLoad={onLoad} async />}
      {children}
    </FastTrackConnectionContext.Provider>
  );
};

export const useFastTrackConnection = () => useContext(FastTrackConnectionContext);

import { PropsWithChildren, createContext, useContext } from 'react';
import { useQuery } from 'react-query';

import { settings } from '@api/site';
import { Site } from '@sharedTypes/api';
import { getSiteId } from '@utils/api-utils';

const SiteSettingsContext = createContext<Site.SiteSettings | null>(null);

export const SiteSettingsContextProvider = ({ children }: PropsWithChildren<object>) => {
  const { data } = useQuery([getSiteId()], settings);
  return <SiteSettingsContext.Provider value={data ?? null}>{children}</SiteSettingsContext.Provider>;
};

export const useSiteSettings = (): Site.SiteSettings | null => useContext(SiteSettingsContext);

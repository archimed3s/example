import { Site } from '@sharedTypes/api';
import { get } from '@utils/fetcher';

const baseUrl = '/api';
export const QUERY_KEYS = {
  settings: 'settings',
};
export const settings = () => get<Site.SiteSettings>(`${baseUrl}/site/settings`);

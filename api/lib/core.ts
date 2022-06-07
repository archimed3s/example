import {
  AuthenticationApi,
  Configuration,
  PlayersApi,
  SitesessionsApi,
  SlotegratorApi,
  UsersApi,
} from '@lib/core-client';

export const configuration = new Configuration({
  basePath: process.env.CORE_API_BASE_URL,
});
export const authenticationApi = new AuthenticationApi(configuration);
export const usersApi = new UsersApi(configuration);
export const playersApi = new PlayersApi(configuration);
export const siteSessionsApi = new SitesessionsApi(configuration);
export const slotegratorApi = new SlotegratorApi(configuration);

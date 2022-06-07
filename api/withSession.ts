import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from 'next';

import { AUTH_COOKIE_NAME, Player } from '@sharedTypes/Player';

declare module 'iron-session' {
  interface IronSessionData {
    player?: Player;
    siteSessionToken?: string;
  }
}

export const sessionOptions = {
  password: process.env.SESSION_HASH || 'complex_password_at_least_32_characters_long',
  cookieName: AUTH_COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export const withSessionRoute = (handler: NextApiHandler) => withIronSessionApiRoute(handler, sessionOptions);

export const withSessionSsr = <P extends { [key: string]: unknown } = { [key: string]: unknown }>(
  handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) => withIronSessionSsr(handler, sessionOptions);

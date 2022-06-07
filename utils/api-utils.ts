import { NextApiRequest } from 'next';
import { getClientIp as nextGetClientIp } from 'request-ip';

export const getSiteId = () => {
  return process.env.SITE_ID || 'dev';
};

export const getClientIp = (req: NextApiRequest) => {
  return nextGetClientIp(req) || '127.0.0.1';
};

export const getUserAgent = (req: NextApiRequest) => {
  return req.headers['user-agent'] || '';
};

export const getReferrer = (req: NextApiRequest) => {
  return req.headers.referer || '';
};

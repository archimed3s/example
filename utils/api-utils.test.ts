import { NextApiRequest } from 'next';
import requestIp from 'request-ip';

import { getClientIp, getSiteId } from '@utils/api-utils';

jest.mock('request-ip');

describe('api utils', () => {
  describe('getSiteId', () => {
    it('should return env with site id', () => {
      process.env.SITE_ID = 'site id';
      expect(getSiteId()).toBe('site id');
    });
  });

  describe('getClientIp', () => {
    it('should return default ip', () => {
      const getIp = jest.spyOn(requestIp, 'getClientIp');
      getIp.mockImplementationOnce(() => null);
      expect(getClientIp({} as NextApiRequest)).toBe('127.0.0.1');
    });

    it('should return default ip', () => {
      const getIp = jest.spyOn(requestIp, 'getClientIp');
      getIp.mockImplementationOnce(() => '1.1.1.1.1');
      expect(getClientIp({} as NextApiRequest)).toBe('1.1.1.1.1');
    });
  });
});

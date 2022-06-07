import axios from 'axios';
import { testApiHandler } from 'next-test-api-route-handler';
import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

import * as sessionMethod from '@api/withSession';

import { apiRouteHandler } from './middleware';

describe('api middleware', () => {
  it('should return error when wrong request type', async () => {
    const handler = apiRouteHandler({ get: jest.fn() });

    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'POST' });
        const response = await res.json();

        expect(response).toEqual({
          code: 'MethodNotAllowed',
          message: 'Method POST now allowed',
        });
      },
    });
  });

  it('should use get method as default when request without method', async () => {
    const apiMethod = (req: NextApiRequest, res: NextApiResponse) => {
      res.status(200).send({});
    };
    const handler = apiRouteHandler({
      get: apiMethod,
    });

    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: undefined });

        expect(res.status).toEqual(500);
      },
    });
  });

  it('should use session when session is required', async () => {
    const sessionSpy = jest.spyOn(sessionMethod, 'withSessionRoute');
    const apiMethod = (req: NextApiRequest, res: NextApiResponse) => {
      res.status(200).send({});
    };
    const handler = apiRouteHandler({
      get: apiMethod,
    });

    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        await fetch({ method: 'GET' });

        expect(sessionSpy).toHaveBeenCalledTimes(1);
      },
    });
  });

  describe('when request error', () => {
    it('should return 500 status when error is not axios', async () => {
      const handler = apiRouteHandler({
        get: jest.fn(() => Promise.reject(new Error('Custom error'))),
      });
      await testApiHandler({
        handler,
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          const json = await res.json();

          expect(res.status).toBe(500);
          expect(json).toEqual({ message: {} });
        },
      });
    });

    it('should return default error when axios error', async () => {
      jest.spyOn(axios, 'isAxiosError').mockImplementationOnce(() => true);

      const handler = apiRouteHandler({
        get: jest.fn(() => Promise.reject(new Error())),
      });
      await testApiHandler({
        handler,
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          const json = await res.json();

          expect(res.status).toBe(500);
          expect(json).toEqual({
            code: 'ApiRequestError',
            message: 'Api request error',
          });
        },
      });
    });

    it('should return 500 error code when not axios error', async () => {
      jest.spyOn(axios, 'isAxiosError').mockImplementationOnce(() => false);

      const handler = apiRouteHandler({
        get: jest.fn(() => Promise.reject(new Error('error'))),
      });
      await testApiHandler({
        handler,
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          const json = await res.json();

          expect(res.status).toBe(500);
          expect(json).toEqual({
            message: {},
          });
        },
      });
    });
  });
});

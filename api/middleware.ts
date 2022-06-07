import axios from 'axios';
import formidable, { File } from 'formidable';
import * as t from 'io-ts';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { siteSessionsApi } from '@api/lib/core';
import { withSessionRoute } from '@api/withSession';
import { Player } from '@sharedTypes/Player';
import { ServerError } from '@sharedTypes/ServerError';
import { getSiteId } from '@utils/api-utils';
import { decode } from '@utils/io-ts';

type Method = 'head' | 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'trace' | string;

type ApiHandler = {
  [key: Method]: NextApiHandler;
};

type NextApiRequestTyped<T> = Omit<NextApiRequest, keyof T> & T;

interface Middleware<Req, T> {
  // body used to keep Req type
  __body?: Req extends NextApiRequest ? Req : never;

  <R extends NextApiRequest>(req: R, res: NextApiResponse<T>): Promise<void>;
}

type UnionToIntersection<T> = (T extends unknown ? (x: T) => unknown : never) extends (x: infer R) => unknown
  ? R
  : never;
type UnpackMiddlewareReq<Mw> = Mw extends Middleware<infer R, unknown>
  ? R extends NextApiRequestTyped<infer T>
    ? T
    : never
  : never;
type UnpackMiddlewareRes<Mw> = Mw extends Middleware<unknown, infer T> ? T : never;

export const composeMiddleware =
  <Res>() =>
  <Mw extends Middleware<unknown, unknown>>(
    middlewares: Mw[],
    handler: (
      req: NextApiRequestTyped<UnionToIntersection<UnpackMiddlewareReq<Mw>>>,
      res: NextApiResponse<UnpackMiddlewareRes<Mw> | Res>,
    ) => Promise<void>,
  ) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      for (const middleware of middlewares) {
        if (!res.writableEnded) {
          await middleware(req, res);
        }
      }
      if (!res.writableEnded) {
        await handler(
          req as unknown as NextApiRequestTyped<UnionToIntersection<UnpackMiddlewareReq<Mw>>>,
          res as NextApiResponse<UnpackMiddlewareRes<Mw> | Res>,
        );
      }
    };
  };

const errorHandler = (err: unknown, res: NextApiResponse) => {
  // eslint-disable-next-line no-console
  console.log(err);
  if (axios.isAxiosError(err)) {
    return res.status(err.response?.status || 500).json({
      code: err.response?.data.code || 'ApiRequestError',
      message: err.response?.data?.attributes?.err || err.response?.data.message || 'Api request error',
    });
  } else {
    return res.status(500).json({ message: err });
  }
};

export const apiRouteHandler = (apiHandler: ApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method?.toLowerCase() || 'get';
    const handler = apiHandler[method];

    // check handler supports HTTP method
    if (!handler)
      return res.status(405).json({
        code: 'MethodNotAllowed',
        message: `Method ${req.method} now allowed`,
      });

    try {
      // route handler
      await withSessionRoute(handler)(req, res);
    } catch (err) {
      // global error handler
      errorHandler(err, res);
    }
  };
};

const getSession = async (
  session: NextApiRequest['session'],
): Promise<
  | undefined
  | {
      player: Player;
      siteSessionToken: string;
    }
> => {
  const player = session.player;
  const siteSessionToken = session.siteSessionToken;

  if (!player || !siteSessionToken) {
    return undefined;
  }

  let axiosResponse;
  try {
    axiosResponse = await siteSessionsApi.validateSiteSession({
      token: siteSessionToken,
      siteId: getSiteId(),
    });
  } catch {
    session.destroy();
    throw Error();
  }

  // Verify session playerId
  if (axiosResponse.data.playerId !== player.playerId) {
    throw Error();
  }

  return {
    player,
    siteSessionToken,
  };
};

export type RequestSession = {
  session: NextApiRequest['session'] & {
    player: Player;
    siteSessionToken: string;
  };
};

export type OptionalRequestSession = {
  session: NextApiRequest['session'] & {
    player: Player | undefined;
    siteSessionToken: string | undefined;
  };
};
export const authMiddleware =
  <T extends true | false = true>(
    required: T = true as T,
  ): Middleware<
    NextApiRequestTyped<T extends false ? OptionalRequestSession : RequestSession>,
    undefined | ServerError
  > =>
  async (req, res) => {
    try {
      const session = await getSession(req.session);
      if (!session && required) {
        return res.status(401).json({
          code: 'NotAuthenticated',
          message: 'User is not authenticated',
        });
      }
      req.session = {
        ...req.session,
        player: session?.player,
        siteSessionToken: session?.siteSessionToken,
      };
    } catch {
      return res.status(401).json({
        code: 'NotAuthenticated',
        message: 'User is not authenticated',
      });
    }
  };

export type NextApiRequestBodyTyped<T = unknown> = {
  body: T;
};
export const bodyDecodeMiddleware = <Req = unknown>(
  codec: t.Type<Req>,
): Middleware<NextApiRequestTyped<{ body: Req }>, undefined | ServerError> => {
  return async (req: NextApiRequestBodyTyped<Req>, res: NextApiResponse) => {
    const data = decode(codec, req.body);
    if (!data) {
      return res.status(400).json({
        code: 'IncorrectRequest',
        message: 'Incorrect request params',
      });
    }
    req.body = data;
  };
};

const form = formidable({ multiples: true }); // multiples means req.files will be an array

export const parseMultipartForm = async (req: NextApiRequest) =>
  await new Promise<{ body: unknown; files: File[] }>((resolve, reject) => {
    form.parse(req, (err, fields, { files }) => {
      if (err) {
        reject(err);
      }

      if (!files) {
        resolve({ body: fields, files: [] });
      }

      resolve({ body: fields, files: Array.isArray(files) ? files : [files] });
    });
  });

export const multiFormParsedMiddleware =
  <Req = unknown>(
    codec: t.Type<Req>,
  ): Middleware<NextApiRequestTyped<{ body: Req; files: File[] }>, undefined | ServerError> =>
  async (req, res) => {
    const { body, files } = await parseMultipartForm(req);
    const data = decode(codec, body);

    if (!data) {
      return res.status(400).json({
        code: 'IncorrectRequest',
        message: 'Incorrect request params',
      });
    }

    req.body = data;
    req.files = files;
  };

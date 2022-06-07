import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { get, post } from '@utils/fetcher';

const TEST_URL = '/test-get';
const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${TEST_URL}`;

const server = setupServer(
  rest.get(baseUrl, (req, res, ctx) => {
    return res(ctx.json({ get: 'test' }));
  }),
  rest.post(baseUrl, (req, res, ctx) => {
    return res(ctx.json({ post: 'test' }));
  }),
);

describe('fetcher', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should do get request to url', async () => {
    const res = await get(TEST_URL);

    expect(res).toStrictEqual({ get: 'test' });
  });

  it('should do post request to url', async () => {
    const res = await post(TEST_URL);

    expect(res).toStrictEqual({ post: 'test' });
  });
});

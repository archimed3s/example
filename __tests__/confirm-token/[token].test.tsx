import { rest } from 'msw';
import { setupServer } from 'msw/node';
import mockRouter from 'next-router-mock';

import ConfirmationPage from '@pages/confirm-token/[token]';
import { render, restAuthMeHandler, screen, waitFor } from '@utils/test-utils';

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

const server = setupServer(
  restAuthMeHandler(),
  rest.post(`${baseUrl}/auth/confirmToken/testToken`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
);

beforeAll(() => server.listen());
beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');
  useRouter.mockReturnValue({ query: { token: 'testToken' } });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Confirm token page', () => {
  it('should render only centered spinner on page', async () => {
    render(<ConfirmationPage />);
    await waitFor(() => {
      expect(screen.queryByTestId('confirm-token-spinner')).not.toBeInTheDocument();
    });
  });

  it('should redirect to home page when server return error', async () => {
    server.use(
      rest.post(`${baseUrl}/auth/confirmToken/testToken`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            code: 'PlayerFailedVerificationEmail',
            message: 'Failed verified email',
          }),
        );
      }),
    );

    render(<ConfirmationPage />);

    await waitFor(() => {
      expect(screen.queryByTestId('confirm-token-spinner')).not.toBeInTheDocument();
    });

    await waitFor(() => expect(mockRouter.pathname).toBe('/'));
  });
});

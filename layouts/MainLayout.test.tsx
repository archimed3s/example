import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import mockRouter from 'next-router-mock';

import { PaymentContextProvider } from '@hooks/usePaymentContext';
import { PlayerStateReducerProvider } from '@hooks/usePlayerState/useStateReducer';
import { render, restAuthMeHandler, screen, waitFor } from '@utils/test-utils';

import { createFakePlayer } from '../__mocks__/createFakePlayer';
import { MainLayout } from './MainLayout';

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    __esModule: true,
    ...originalModule,
    useBreakpointValue: (values: Record<string, unknown>) => values.md,
  };
});

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;
const logoutUrl = `${baseUrl}/auth/logout`;

const server = setupServer(
  restAuthMeHandler(),
  rest.post(logoutUrl, (req, res, ctx) => {
    return res(ctx.status(204));
  }),
);

const Layout = () => (
  <MainLayout>
    <div>Test content</div>
  </MainLayout>
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MainLayout tests', () => {
  xit('should render content inside layout', () => {
    render(<Layout />);

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  xit('should render text and sign out button when user logged in', async () => {
    server.use(
      rest.post(logoutUrl, (req, res, ctx) => {
        return res(ctx.status(204));
      }),
    );
    const fakePlayer = createFakePlayer({ playerId: 123 });
    render(
      <PaymentContextProvider>
        <PlayerStateReducerProvider currentPlayer={fakePlayer} />
      </PaymentContextProvider>,
    );
    expect(screen.getByText('User profile')).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();

    const signOutBtn = screen.getByText(/logout/i);

    userEvent.click(signOutBtn);

    await waitFor(() => expect(screen.getByText('Hi guest!')));
    await waitFor(() => expect(screen.getByText('Sign In')));
    await waitFor(() => expect(screen.getByText('Sign Up')));
  });

  xit('should render text and signin/signup button for guest', () => {
    render(<PlayerStateReducerProvider currentPlayer={null} />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Hi guest!')).toBeInTheDocument();
  });

  xit('should redirect to sign up page when clicked sign up button', async () => {
    render(
      <PaymentContextProvider>
        <Layout />
      </PaymentContextProvider>,
    );

    const signInBtn = screen.getByText('Sign Up');

    userEvent.click(signInBtn);
    await waitFor(() => expect(expect(mockRouter.pathname).toBe('/')));
  });
});

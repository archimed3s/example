import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import mockRouter from 'next-router-mock';

import { LoginPage } from '@modules/LoginPage/LoginPage';
import { render, restAuthMeHandler, screen, waitFor } from '@utils/test-utils';

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;
const loginUrl = `${baseUrl}/auth/login`;

const server = setupServer(
  restAuthMeHandler(),
  rest.post(loginUrl, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('LoginForm', () => {
  xit('should render form', () => {
    render(<LoginPage />);

    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });

  xit('should show errors when form is empty and user submit form', async () => {
    render(<LoginPage />);

    const submitBtn = screen.getByTestId('login-submit');

    userEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByText('email is a required field')));
    await waitFor(() => expect(screen.getByText('password must be at least 6 characters')));
  });

  xit('should show password error when password field not valid', async () => {
    render(<LoginPage />);

    const submitBtn = screen.getByTestId('login-submit');
    const passwordField = screen.getByTestId('login-password');

    userEvent.type(passwordField, '12345');

    userEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByText('password must be at least 6 characters')));
  });

  xit('should show email error when password field not valid', async () => {
    render(<LoginPage />);

    const submitBtn = screen.getByTestId('login-submit');
    const emailField = screen.getByTestId('login-email');

    userEvent.type(emailField, '123456');

    userEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByText('email must be a valid email')));
  });

  xit('should show error when server return error', async () => {
    server.use(
      rest.post(loginUrl, (req, res, ctx) => {
        return res(ctx.status(400));
      }),
    );

    render(<LoginPage />);

    const submitBtn = screen.getByTestId('login-submit');
    const passwordField = screen.getByTestId('login-password');
    const emailField = screen.getByTestId('login-email');

    userEvent.type(passwordField, '123456');
    userEvent.type(emailField, 'test@gmail.com');

    userEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByRole('alert', { name: 'Email or password is incorrect' })));
  });

  it('should redirect when server return success', async () => {
    server.use(
      rest.post(loginUrl, (req, res, ctx) => {
        return res(ctx.status(200));
      }),
    );

    render(<LoginPage />);

    const submitBtn = screen.getByTestId('login-submit');
    const passwordField = screen.getByTestId('login-password');
    const emailField = screen.getByTestId('login-email');

    userEvent.type(passwordField, '123456');
    userEvent.type(emailField, 'test@gmail.com');

    userEvent.click(submitBtn);

    await waitFor(() => expect(expect(mockRouter.pathname).toMatch(/\/?/)));
  });

  xit('should show error when server return error', async () => {
    server.use(
      rest.post(`${baseUrl}/auth/login`, (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            code: 'PlayerLoginAttemptsLimitReached',
            message: 'Player login attempts max limit reached',
          }),
        );
      }),
    );

    render(<LoginPage />);

    const submitBtn = screen.getByTestId('login-submit');
    const passwordField = screen.getByTestId('login-password');
    const emailField = screen.getByTestId('login-email');

    userEvent.type(passwordField, '123456');
    userEvent.type(emailField, 'test@gmail.com');

    userEvent.click(submitBtn);

    await waitFor(() =>
      expect(
        screen.getByRole('alert', {
          name: 'Player login attempts max limit reached',
        }),
      ),
    );
  });
});

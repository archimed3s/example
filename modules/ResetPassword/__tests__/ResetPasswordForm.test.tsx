import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import mockRouter from 'next-router-mock';

import { ResetPasswordForm } from '@modules/ResetPassword/ResetPasswordForm';
import { render, restAuthMeHandler, screen, waitFor } from '@utils/test-utils';

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

const server = setupServer(
  restAuthMeHandler(),
  rest.post(`${baseUrl}/auth/login`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
);

xdescribe('ResetPasswordForm', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render form', () => {
    render(<ResetPasswordForm />);

    expect(screen.getByTestId('reset-password-form')).toBeInTheDocument();
  });

  it('should show errors when form is empty and user submit form', async () => {
    render(<ResetPasswordForm />);

    const submitBtn = screen.getByTestId('reset-password-submit');

    userEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByText('email is a required field')));
  });

  it('should show email error when password field not valid', async () => {
    render(<ResetPasswordForm />);

    const submitBtn = screen.getByTestId('reset-password-submit');
    const emailField = screen.getByTestId('reset-password-email');

    userEvent.type(emailField, 'test@email.com1');

    userEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByText('email must be a valid email')));
  });

  it.skip('should show error when server return error', async () => {
    server.use(
      rest.post(`${baseUrl}/auth/resetPassword`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            code: 'PlayerNotFound',
            message: 'Player not found',
          }),
        );
      }),
    );

    render(<ResetPasswordForm />);

    const submitBtn = screen.getByTestId('reset-password-submit');
    const emailField = screen.getByTestId('reset-password-email');

    userEvent.type(emailField, 'test@gmail.com');

    userEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByRole('alert', { name: 'Player not found' })));
  });

  xit("should show 'Something went wrong' error when server no return error code", async () => {
    server.use(
      rest.post(`${baseUrl}/auth/resetPassword`, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    render(<ResetPasswordForm />);

    const submitBtn = screen.getByTestId('reset-password-submit');
    const emailField = screen.getByTestId('reset-password-email');

    userEvent.type(emailField, 'test@gmail.com');

    userEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByRole('alert', { name: 'Something went wrong' })));
  });

  it('should redirect when server return success', async () => {
    server.use(
      rest.post(`${baseUrl}/auth/resetPassword`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            token: 'testUserToken',
          }),
        );
      }),
    );

    render(<ResetPasswordForm />);

    const submitBtn = screen.getByTestId('reset-password-submit');
    const emailField = screen.getByTestId('reset-password-email');

    userEvent.type(emailField, 'test@gmail.com');

    userEvent.click(submitBtn);

    await waitFor(() => expect(expect(mockRouter.pathname).toBe('/')));
  });
});

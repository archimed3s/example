import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import mockRouter from 'next-router-mock';

import { PASSWORD_DEFAULT_RULES } from '@common/validators/constants';
import { ChangePasswordForm } from '@modules/ResetPassword/ChangePasswordForm';
import { render, restAuthMeHandler, screen, waitFor } from '@utils/test-utils';

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

const server = setupServer(
  restAuthMeHandler(),
  rest.post(`${baseUrl}/auth/login`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
);

window.console.error = jest.fn();

const PASSWORD_RULES = { ...PASSWORD_DEFAULT_RULES, min: 7 };

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ChangePasswordForm', () => {
  it('should render form', () => {
    render(<ChangePasswordForm passwordRules={PASSWORD_RULES} />);

    expect(screen.getByTestId('change-password-form')).toBeInTheDocument();
  });

  xit('should show errors when form is empty and user submit form', async () => {
    render(<ChangePasswordForm passwordRules={PASSWORD_RULES} />);

    const submitBtn = screen.getByTestId('change-password-submit');

    userEvent.click(submitBtn);

    await waitFor(() => {
      const element = screen.getAllByText('Password is a required field');
      return expect(element.length);
    });
  });

  it('should show validation error when password field not valid', async () => {
    render(<ChangePasswordForm passwordRules={PASSWORD_RULES} />);

    const submitBtn = screen.getByTestId('change-password-submit');
    const passwordField = screen.getByTestId('change-password-field');

    userEvent.type(passwordField, '12345');

    userEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByText(`Password must be at least ${PASSWORD_RULES.min} characters`)));
  });

  xit('should show error when server return error', async () => {
    server.use(
      rest.post(`${baseUrl}/auth/changePassword`, (req, res, ctx) => {
        return res(
          ctx.status(422),
          ctx.json({
            code: 'PlayerPasswordDoesNotMeetRequirements',
            message: 'Player password does not meet requirements',
          }),
        );
      }),
    );

    render(<ChangePasswordForm passwordRules={PASSWORD_RULES} />);

    const submitBtn = screen.getByTestId('change-password-submit');
    const passwordField = screen.getByTestId('change-password-field');
    const passwordField2 = screen.getByTestId('change-password-field2');
    userEvent.type(passwordField, 'Test1234');
    userEvent.type(passwordField2, 'Test1234');

    userEvent.click(submitBtn);

    await waitFor(() =>
      expect(
        screen.getByRole('alert', {
          name: 'Player password does not meet requirements',
        }),
      ),
    );
  });

  xit("should show 'Something went wrong' error when server no return error code", async () => {
    server.use(
      rest.post(`${baseUrl}/auth/changePassword`, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    render(<ChangePasswordForm passwordRules={PASSWORD_RULES} />);

    const submitBtn = screen.getByTestId('change-password-submit');
    const passwordField = screen.getByTestId('change-password-field');
    const passwordField2 = screen.getByTestId('change-password-field2');

    userEvent.type(passwordField, 'Test1234');
    userEvent.type(passwordField2, 'Test1234');

    userEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByRole('alert', { name: 'Something went wrong' })));
  });

  xit('should redirect to login page when server return success', async () => {
    server.use(
      rest.post(`${baseUrl}/auth/changePassword`, (req, res, ctx) => {
        return res(ctx.status(200));
      }),
    );

    render(<ChangePasswordForm passwordRules={PASSWORD_RULES} />);

    const submitBtn = screen.getByTestId('change-password-submit');
    const passwordField = screen.getByTestId('change-password-field');
    const passwordField2 = screen.getByTestId('change-password-field2');

    userEvent.type(passwordField, 'Test1234');
    userEvent.type(passwordField2, 'Test1234');

    userEvent.click(submitBtn);

    await waitFor(() => expect(expect(mockRouter.pathname).toBe('/signin')));
  });
});

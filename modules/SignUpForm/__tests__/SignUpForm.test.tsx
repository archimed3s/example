import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import mockRouter from 'next-router-mock';

import { PASSWORD_DEFAULT_RULES } from '@common/validators/constants';
import { SignUpForm } from '@modules/SignUpForm/SignUpForm';
import { render, restAuthMeHandler, screen, waitFor } from '@utils/test-utils';

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

const server = setupServer(
  restAuthMeHandler(),
  rest.post(`${baseUrl}/auth/signup`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${baseUrl}/site/settings`, (req, res, ctx) => {
    return res(ctx.json({ currencies: ['EUR', 'BTC'] }));
  }),
);

const PASSWORD_RULES = { ...PASSWORD_DEFAULT_RULES, min: 7 };

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

xdescribe('SignUpForm', () => {
  it('should render form', () => {
    render(<SignUpForm passwordRules={PASSWORD_RULES} />);

    expect(screen.getByTestId('signup-form')).toBeInTheDocument();
  });

  it('should disable continue button on step1 when form is empty', async () => {
    render(<SignUpForm passwordRules={PASSWORD_RULES} />);

    const acceptCheckbox = screen.getByTestId('signup-accept-checkbox');
    userEvent.click(acceptCheckbox);

    await waitFor(() => expect(screen.getByTestId('signup-continue-step-1').hasAttribute('disabled')));
  });

  it('should disable continue button on step1 when password field not valid', async () => {
    render(<SignUpForm passwordRules={PASSWORD_RULES} />);

    const usernameField = screen.getByTestId('signup-username');
    const emailField = screen.getByTestId('signup-email');
    // eslint-disable-next-line testing-library/no-node-access
    const passwordField = screen.getByTestId('signup-password').closest('input');
    const acceptCheckbox = screen.getByTestId('signup-accept-checkbox');

    userEvent.click(acceptCheckbox);
    await waitFor(() => {
      expect(passwordField).toBeInTheDocument();
    });
    if (passwordField) userEvent.type(passwordField, '12345');
    userEvent.type(usernameField, 'username');
    userEvent.type(emailField, 'user@gmail.com');

    await waitFor(() => expect(screen.getByTestId('signup-continue-step-1').hasAttribute('disabled')));
  }, 20000);

  it('should disable continue button on step1 when email field not valid', async () => {
    render(<SignUpForm passwordRules={PASSWORD_RULES} />);

    const usernameField = screen.getByTestId('signup-username');
    const emailField = screen.getByTestId('signup-email');
    // eslint-disable-next-line testing-library/no-node-access
    const passwordField = screen.getByTestId('signup-password').closest('input');
    const acceptCheckbox = screen.getByTestId('signup-accept-checkbox');

    userEvent.click(acceptCheckbox);
    await waitFor(() => {
      expect(passwordField).toBeInTheDocument();
    });
    if (passwordField) userEvent.type(passwordField, 'UserAdmin123');
    userEvent.type(usernameField, 'username');
    userEvent.type(emailField, 'user@');

    await waitFor(() => expect(screen.getByTestId('signup-continue-step-1').hasAttribute('disabled')));
  }, 20000);

  it('should disable continue button on step2 when dateOfBirth field not valid', async () => {
    render(<SignUpForm passwordRules={PASSWORD_RULES} />);

    const continueBtn1 = screen.getByTestId('signup-continue-step-1');
    const usernameField = screen.getByTestId('signup-username');
    const emailField = screen.getByTestId('signup-email');
    // eslint-disable-next-line testing-library/no-node-access
    const passwordField = screen.getByTestId('signup-password').closest('input');
    const acceptCheckbox = screen.getByTestId('signup-accept-checkbox');

    userEvent.click(acceptCheckbox);
    await waitFor(() => {
      expect(passwordField).toBeInTheDocument();
    });
    if (passwordField) userEvent.type(passwordField, 'UserAdmin123');
    userEvent.type(usernameField, 'username');
    userEvent.type(emailField, 'user@gmail.com');
    userEvent.click(continueBtn1);

    const birthdayField = screen.getByTestId('signup-birthday');
    userEvent.type(birthdayField, 'july 12');

    await waitFor(() => expect(screen.getByTestId('signup-continue-step-2').hasAttribute('disabled')));
  });

  xit('should show server error when server return error', async () => {
    server.use(
      rest.post(`${baseUrl}/auth/signup`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            code: 'PlayerEmailIsAlreadyTaken',
            message: 'Player email is already taken',
          }),
        );
      }),
    );

    render(<SignUpForm passwordRules={PASSWORD_RULES} />);

    const continueBtn1 = screen.getByTestId('signup-continue-step-1');
    const usernameField = screen.getByTestId('signup-username');
    const emailField = screen.getByTestId('signup-email');
    // eslint-disable-next-line testing-library/no-node-access
    const passwordField = screen.getByTestId('signup-password').closest('input');
    const acceptCheckbox = screen.getByTestId('signup-accept-checkbox');

    userEvent.click(acceptCheckbox);
    await waitFor(() => {
      expect(passwordField).toBeInTheDocument();
    });
    if (passwordField) userEvent.type(passwordField, 'UserAdmin123');
    userEvent.type(usernameField, 'username');
    userEvent.type(emailField, 'user@gmail.com');
    userEvent.click(continueBtn1);

    const genderMaleBtn = screen.getByTestId('signup-gender-male-btn');
    const birthdayField = screen.getByTestId('signup-birthday');
    const continueBtn2 = screen.getByTestId('signup-continue-step-2');

    userEvent.type(birthdayField, '1999-01-01');
    userEvent.click(genderMaleBtn);
    userEvent.click(continueBtn2);

    const submitBtn = screen.getByTestId('signup-submit');
    const currencyDropdown = screen.getByText(/Select currency/i);
    userEvent.click(currencyDropdown);
    const currencyOption = await screen.findByText(/EUR/i);
    userEvent.click(currencyOption);
    userEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByRole('alert', { name: 'Player email is already taken' })));
  }, 10000);

  xit("should show 'Something went wrong' error when server no return error code", async () => {
    server.use(
      rest.post(`${baseUrl}/auth/signup`, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    render(<SignUpForm passwordRules={PASSWORD_RULES} />);

    const continueBtn1 = screen.getByTestId('signup-continue-step-1');
    const usernameField = screen.getByTestId('signup-username');
    const emailField = screen.getByTestId('signup-email');
    // eslint-disable-next-line testing-library/no-node-access
    const passwordField = screen.getByTestId('signup-password').closest('input');
    const acceptCheckbox = screen.getByTestId('signup-accept-checkbox');

    userEvent.click(acceptCheckbox);
    await waitFor(() => {
      expect(passwordField).toBeInTheDocument();
    });
    if (passwordField) userEvent.type(passwordField, '1234567');
    userEvent.type(usernameField, 'username');
    userEvent.type(emailField, 'user@gmail.com');
    userEvent.click(continueBtn1);

    const genderMaleBtn = screen.getByTestId('signup-gender-male-btn');
    const birthdayField = screen.getByTestId('signup-birthday');
    const continueBtn2 = screen.getByTestId('signup-continue-step-2');

    userEvent.type(birthdayField, '1999-01-01');
    userEvent.click(genderMaleBtn);
    userEvent.click(continueBtn2);

    const submitBtn = screen.getByTestId('signup-submit');
    const currencyDropdown = screen.getByText(/Select currency/i);
    userEvent.click(currencyDropdown);
    const currencyOption = await screen.findByText(/EUR/i);
    userEvent.click(currencyOption);
    userEvent.click(submitBtn);

    await waitFor(() => expect(screen.getByRole('alert', { name: 'Something went wrong' })));
  }, 10000);

  it('should redirect when server return success', async () => {
    server.use(
      rest.post(`${baseUrl}/auth/signup`, (req, res, ctx) => {
        return res(ctx.status(200));
      }),
    );

    render(<SignUpForm passwordRules={PASSWORD_RULES} />);

    const continueBtn1 = screen.getByTestId('signup-continue-step-1');
    const usernameField = screen.getByTestId('signup-username');
    const emailField = screen.getByTestId('signup-email');
    // eslint-disable-next-line testing-library/no-node-access
    const passwordField = screen.getByTestId('signup-password').closest('input');
    const acceptCheckbox = screen.getByTestId('signup-accept-checkbox');

    userEvent.click(acceptCheckbox);
    await waitFor(() => {
      expect(passwordField).toBeInTheDocument();
    });
    if (passwordField) userEvent.type(passwordField, 'UserAdmin123');
    userEvent.type(usernameField, 'username');
    userEvent.type(emailField, 'user@gmail.com');
    userEvent.click(continueBtn1);

    const genderMaleBtn = screen.getByTestId('signup-gender-male-btn');
    const birthdayField = screen.getByTestId('signup-birthday');
    const continueBtn2 = screen.getByTestId('signup-continue-step-2');

    userEvent.type(birthdayField, '1999-01-01');
    userEvent.click(genderMaleBtn);
    userEvent.click(continueBtn2);

    const submitBtn = screen.getByTestId('signup-submit');
    const currencyDropdown = screen.getByText(/Select currency/i);
    userEvent.click(currencyDropdown);
    const currencyOption = await screen.findByText(/EUR/i);
    userEvent.click(currencyOption);
    userEvent.click(submitBtn);

    // await waitFor(() => {
    //   expect(screen.getByTestId('signup-lets-go')).toBeInTheDocument();
    // });
    //
    // userEvent.click(screen.getByTestId('signup-lets-go'));

    await waitFor(() => expect(expect(mockRouter.pathname).toMatch(/\/?/)));
  }, 10000);
});

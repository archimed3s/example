import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { PASSWORD_DEFAULT_RULES } from '@common/validators/constants';
import ChangePasswordPage, { getServerSideProps } from '@pages/change-password/[token]';
import { render, restAuthMeHandler, screen } from '@utils/test-utils';

const baseUrl = `http://0.0.0.0`;

const server = setupServer(
  restAuthMeHandler(),
  rest.get(`${baseUrl}/site`, (req, res, ctx) => {
    return res(
      ctx.status(422),
      ctx.json({
        code: 'PlayerPasswordDoesNotMeetRequirements',
        message: 'Player password does not meet requirements',
      }),
    );
  }),
);

window.console.error = jest.fn();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Change password page', () => {
  it('should render change password form', () => {
    render(<ChangePasswordPage passwordRules={PASSWORD_DEFAULT_RULES} />);
    expect(screen.getByTestId('change-password-form')).toBeInTheDocument();
  });

  describe('getServerSideProps', () => {
    it('should return password rules from DB', async () => {
      server.use(
        rest.get(`${baseUrl}/site`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              {
                password_rule_min_length: 1,
                password_rule_max_length: 2,
                password_rule_min_numeric_count: 3,
                password_rule_min_uppercase_count: 4,
              },
            ]),
          );
        }),
      );
      const props = await getServerSideProps();

      const res = {
        props: {
          passwordRules: {
            min: 6,
            max: 20,
            numbers: 1,
            upper: 1,
          },
        },
      };

      expect(props).toEqual(res);
    });

    it('should return PASSWORD_DEFAULT_RULES if request.method error', async () => {
      const props = await getServerSideProps();

      expect(props).toEqual({ props: { passwordRules: PASSWORD_DEFAULT_RULES } });
    });

    it('should return PASSWORD_DEFAULT_RULES if response does not contain correct data', async () => {
      server.use(
        rest.get(`${baseUrl}/site`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              {
                some: 4,
              },
            ]),
          );
        }),
      );
      const props = await getServerSideProps();

      expect(props).toEqual({ props: { passwordRules: PASSWORD_DEFAULT_RULES } });
    });
  });
});

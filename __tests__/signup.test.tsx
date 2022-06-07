import { screen } from '@utils/test-utils';

// import Signup from '../pages/signup';

// const PASSWORD_RULES = { ...PASSWORD_DEFAULT_RULES, min: 7 };
xdescribe('Signup page', () => {
  it('renders a heading', () => {
    // render(<Signup passwordRules={PASSWORD_RULES} />);

    expect(screen.getByTestId('signup-form')).toBeInTheDocument();
  });
});

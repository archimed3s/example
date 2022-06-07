import Signin from '@pages/signin';
import { render, screen } from '@utils/test-utils';

xdescribe('Signin page', () => {
  it('renders a heading', () => {
    render(<Signin />);

    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
});

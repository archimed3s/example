import { render, screen } from '@utils/test-utils';

import ResetPassword from '../pages/reset-password';

describe('Reset password page', () => {
  it('renders a heading', () => {
    render(<ResetPassword />);

    expect(screen.getByTestId('reset-password-form')).toBeInTheDocument();
  });
});

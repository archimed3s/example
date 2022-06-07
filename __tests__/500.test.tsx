import { render, screen } from '@utils/test-utils';

import InternalServerError from '../pages/500';

describe('500 page', () => {
  it('renders a heading', () => {
    render(<InternalServerError />);

    const heading = screen.getByText('500 Internal Server Error');

    expect(heading).toBeInTheDocument();
  });
});

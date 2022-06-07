import { render, screen } from '@utils/test-utils';

import PageNotFound from '../pages/404';

describe('404 page', () => {
  it('renders a heading', () => {
    render(<PageNotFound />);

    const heading = screen.getByText('You’re lost, my friend.');

    expect(heading).toBeInTheDocument();
  });
});

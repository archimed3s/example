import { render, screen } from '@utils/test-utils';

import { EmptyLayout } from './EmptyLayout';

const Layout = () => (
  <EmptyLayout>
    <div>Test content</div>
  </EmptyLayout>
);

describe('EmptyLayout tests', () => {
  it('should render content inside layout', () => {
    render(<Layout />);

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});

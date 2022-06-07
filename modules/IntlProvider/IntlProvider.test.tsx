// use testing lib to avoid rewriting IntlProvider component
import { render } from '@testing-library/react';

import { IntlProvider } from '@modules/IntlProvider/IntlProvider';
import { screen } from '@utils/test-utils';

jest.mock('react-intl', () => ({
  // Mock rect-intl to check props
  IntlProvider: (props: { locale: string }) => <p>{props.locale}</p>,
}));

describe('IntlProvider component', () => {
  it('should render fn locale', () => {
    render(
      <IntlProvider locale="fn-Fn" defaultLocale="en">
        Hello
      </IntlProvider>,
    );

    expect(screen.getByText('fn')).toBeInTheDocument();
  });

  it('should render en as default locale', () => {
    render(<IntlProvider defaultLocale="en">Hello</IntlProvider>);

    expect(screen.getByText('en')).toBeInTheDocument();
  });
});

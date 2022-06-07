import { defineMessages } from 'react-intl';

import { useErrorMessageByCode } from '@hooks/useErrorMessageByCode';
import { render, screen, waitFor } from '@utils/test-utils';

const messages = defineMessages({
  testStr1: {
    id: 'Tests.testStr1',
    defaultMessage: 'test string 1',
  },
  testStr2: {
    id: 'Tests.testStr2',
    defaultMessage: 'test string 2',
  },
});

describe('useErrorMessageByCode', () => {
  it('should return text according to codeMap', async () => {
    const ERROR_CODES_MAP = {
      default: messages.testStr1,
      c101: messages.testStr2,
    };

    const TestComponent = () => {
      const { createErrorText } = useErrorMessageByCode(ERROR_CODES_MAP);

      return (
        <div>
          <div data-testid="code-101">{createErrorText('c101')}</div>
          <div data-testid="code-default">{createErrorText('test')}</div>
        </div>
      );
    };

    render(<TestComponent />);

    await waitFor(() => {
      const element1 = screen.getByTestId('code-101');

      return expect(element1.innerHTML).toBe('test string 2');
    });
    await waitFor(() => {
      const element1 = screen.getByTestId('code-default');

      return expect(element1.innerHTML).toBe('test string 1');
    });
  });
});

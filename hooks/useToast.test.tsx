import { useEffect } from 'react';

import { useToast } from '@hooks/useToast';
import { render, screen, waitFor } from '@utils/test-utils';

describe('useToast', () => {
  it('should show success toasts', async () => {
    const TestComponent = () => {
      const { success } = useToast();

      useEffect(() => {
        success({ title: 'success toast' });
      }, [success]);

      return <div />;
    };

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByRole('alert', { name: 'success toast' })).toBeInTheDocument();
    });
  });

  it('should show success toasts', async () => {
    const TestComponent = () => {
      const { error } = useToast();

      useEffect(() => {
        error({ title: 'error toast' });
      }, [error]);

      return <div />;
    };

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByRole('alert', { name: 'error toast' })).toBeInTheDocument();
    });
  });
});

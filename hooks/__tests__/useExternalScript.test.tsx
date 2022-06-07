import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useState } from 'react';

import { useExternalScript } from '@hooks/useExternalScript';
import { render, restAuthMeHandler, screen, waitFor } from '@utils/test-utils';

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

const server = setupServer(
  restAuthMeHandler(),
  rest.post(`${baseUrl}/auth/login`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
);

window.console.error = jest.fn();

beforeAll(() => server.listen());
beforeEach(() => {
  server.use(
    rest.get(`${baseUrl}/encscript`, (req, res) => {
      return res((res) => {
        res.status = 200;
        res.headers.set('Content-Type', 'application/javascript');
        res.body = 'var hello=1';
        return res;
      });
    }),
  );

  document.body.innerHTML = '';
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useExternalScript', () => {
  it('should render external script', async () => {
    const TestComponent = () => {
      const { isLoading } = useExternalScript({
        url: `${baseUrl}/encscript`,
      });

      return <div>{!isLoading && <div>test</div>}</div>;
    };

    render(<TestComponent />);

    await waitFor(
      () => {
        const element = screen.getByText('test');

        return expect(element);
      },
      { timeout: 2000 },
    );
  });

  it('should do nothing if url is not set', async () => {
    const TestComponent = () => {
      const { isLoading } = useExternalScript({
        url: '',
      });

      return <div>{!isLoading && <div>test</div>}</div>;
    };

    render(<TestComponent />);

    await waitFor(() => {
      const element = screen.getByText('test');

      return expect(element);
    });
  });

  it('should fail loading external script', async () => {
    server.use(
      rest.get(`${baseUrl}/encscript`, (req, res) => {
        return res((res) => {
          res.status = 404;
          // res.headers.set('Content-Type', 'application/javascript');
          // res.body = 'hello';
          return res;
        });
      }),
    );

    const TestComponent = () => {
      const { isError } = useExternalScript({
        url: `${baseUrl}/encscript`,
      });

      return <div>{isError && <div>error</div>}</div>;
    };

    render(<TestComponent />);

    await waitFor(
      () => {
        const element = screen.getByText('error');

        return expect(element);
      },
      { timeout: 4000 },
    );
  });

  it('should use onSuccess', async () => {
    const TestComponent = () => {
      const [waiting, setWaiting] = useState(true);
      useExternalScript({
        url: `${baseUrl}/encscript`,
        onSuccess: () => setWaiting(false),
      });

      return <div>{!waiting && <div>test</div>}</div>;
    };

    render(<TestComponent />);

    await waitFor(
      () => {
        const element = screen.getByText('test');

        return expect(element);
      },
      { timeout: 2000 },
    );
  });

  it('should do nothing when url changed but the script already exists', async () => {
    server.use(
      rest.get(`${baseUrl}/encscript2`, (req, res) => {
        return res((res) => {
          res.status = 200;
          res.headers.set('Content-Type', 'application/javascript');
          res.body = "window.test2='ok'";
          return res;
        });
      }),
    );

    const TestComponent = () => {
      const [url, setUrl] = useState(`${baseUrl}/encscript`);
      const [counter, setCounter] = useState(0);
      const { isLoading } = useExternalScript({
        url,
        onSuccess: () => setCounter((c) => ++c),
      });

      return (
        <div>
          {!isLoading && <div data-testid={`test-id`}>{counter}</div>}
          <button onClick={() => setUrl(`${baseUrl}/encscript2`)}>click</button>
        </div>
      );
    };

    render(<TestComponent />);

    await waitFor(() => {
      const element = screen.getByTestId('test-id');

      return expect(element.innerHTML).toBe('1');
    });

    const btn = screen.getByText('click');
    userEvent.click(btn);

    await waitFor(() => {
      const element = screen.getByTestId('test-id');

      return expect(element.innerHTML).toBe('1');
    });
  });
});

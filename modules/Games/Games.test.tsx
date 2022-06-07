import { fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, restAuthMeHandler, screen } from '@utils/test-utils';

import { Games } from './Games';

const gameUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lobby/games`;
const gameFiltersUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lobby/gameFilters`;
const defaultPageSize = 12;

const createFakeGames = (times: number, indexOffset = 0) =>
  Array.from(Array(times)).map((_, i) => ({
    id: `${i + indexOffset}`,
    name: `atest${i + indexOffset}`,
    providerHandle: (i + indexOffset) % 2 === 0 ? 'tomhorn' : 'gameart',
  }));

const server = setupServer(
  restAuthMeHandler(),
  rest.get(gameUrl, (req, res, ctx) => res(ctx.json({ games: [] }))),
  rest.get(gameFiltersUrl, (req, res, ctx) => {
    return res(
      ctx.json({
        categories: [],
        providers: [],
      }),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

xdescribe('Games', () => {
  it('should render error if no games', async () => {
    render(<Games pageSize={defaultPageSize} />);
    await waitFor(() => {
      expect(screen.getByText('There are currently no games.')).toBeInTheDocument();
    });
  });

  it('should load more game categories', async () => {
    server.use(
      rest.get(gameUrl, (req, res, ctx) => {
        const offset = Number(req.url.searchParams.get('offset'));
        return res(
          ctx.json({
            games: createFakeGames(Math.min(13 - offset, defaultPageSize), offset),
          }),
        );
      }),
    );

    render(<Games pageSize={defaultPageSize} />);

    await waitFor(() => {
      expect(screen.getByText('Show More')).toBeInTheDocument();
    });

    const showMoreButton = screen.getByText('Show More');
    userEvent.click(showMoreButton);
    await waitFor(() => {
      const games = screen.getAllByTestId('game-categories-item');
      expect(games.length).toBe(13);
    });
  });

  it('should not render show more button when no games', () => {
    render(<Games pageSize={defaultPageSize} />);
    expect(screen.queryByTestId('show-more-btn')).not.toBeInTheDocument();
  });

  it(`should add a new ${defaultPageSize} categories`, async () => {
    server.use(
      rest.get(gameUrl, (req, res, ctx) => {
        const offset = Number(req.url.searchParams.get('offset'));
        const gameData = {
          games: createFakeGames(Math.min(30 - offset, defaultPageSize), offset),
        };
        return res(ctx.json(gameData));
      }),
    );

    render(<Games pageSize={defaultPageSize} />);

    await waitFor(() => {
      expect(screen.getByText('Show More')).toBeInTheDocument();
    });

    const showMoreButton = screen.getByText('Show More');
    userEvent.click(showMoreButton);

    await waitFor(() => {
      const games = screen.getAllByTestId('game-categories-item');
      expect(games.length).toBe(24);
    });
  });

  it('should render providers filter block', () => {
    render(<Games pageSize={defaultPageSize} />);
    expect(screen.getByTestId('game-categories-filter')).toBeInTheDocument();
  });

  it('should change provider value', async () => {
    server.use(
      rest.get(gameFiltersUrl, (req, res, ctx) => {
        return res(
          ctx.json({
            categories: [],
            providers: [
              { id: 'onetouch' },
              { id: 'evolution' },
              { id: 'habanero' },
              { id: 'blueprint' },
              { id: 'playson' },
              { id: 'betsoft' },
              { id: 'tomhorn' },
              { id: 'quickspin' },
              { id: 'thunderkick' },
              { id: 'spinmatic' },
              { id: 'amatic' },
              { id: 'gameart' },
            ],
          }),
        );
      }),
    );

    render(<Games pageSize={defaultPageSize} />);

    const filter = await waitFor(() => screen.findByTestId('game-categories-filter'));
    const options: HTMLOptionElement[] = await waitFor(() => screen.findAllByTestId('game-categories-filter-option'));

    fireEvent.change(filter, {
      target: { value: 'habanero' },
    });

    expect(options[2].selected).toBeTruthy();
  });

  it('should render only specific by provider games', async () => {
    server.use(
      rest.get(gameUrl, (req, res, ctx) => {
        const provider = req.url.searchParams.get('provider');
        return res(
          ctx.json({
            games: createFakeGames(10).filter((game) => !provider || game.providerHandle === provider),
          }),
        );
      }),
      rest.get(gameFiltersUrl, (req, res, ctx) => {
        return res(
          ctx.json({
            categories: [],
            providers: [
              { id: 'onetouch' },
              { id: 'evolution' },
              { id: 'habanero' },
              { id: 'blueprint' },
              { id: 'playson' },
              { id: 'betsoft' },
              { id: 'tomhorn' },
              { id: 'quickspin' },
              { id: 'thunderkick' },
              { id: 'spinmatic' },
              { id: 'amatic' },
              { id: 'gameart' },
            ],
          }),
        );
      }),
    );

    render(<Games pageSize={defaultPageSize} />);

    const filter = await waitFor(() => screen.findByTestId('game-categories-filter'));
    await waitFor(() => screen.findAllByTestId('game-categories-item'));

    fireEvent.change(filter, {
      target: { value: 'tomhorn' },
    });

    const gameElements = await waitFor(() => screen.findAllByTestId('game-categories-item'));

    expect(gameElements.length).toBe(5);
  });
});

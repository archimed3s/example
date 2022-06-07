import { GetServerSidePropsContext } from 'next';

import PlayerProfilePage, { getServerSideProps } from '@pages/account/settings';
import { render, screen } from '@utils/test-utils';

import { createFakePlayer } from '../../__mocks__/createFakePlayer';

describe('Player Profile page', () => {
  xit('render player profile', () => {
    render(<PlayerProfilePage />);

    const heading = screen.getByText('Profile');

    expect(heading).toBeInTheDocument();
  });

  describe('getServerSideProps', () => {
    it('should return user from session', async () => {
      const player = createFakePlayer();

      const props = await getServerSideProps({
        req: { session: { player } },
      } as GetServerSidePropsContext);

      expect(props).toEqual({ props: { player } });
    });

    it('should return 404 when no user in session', async () => {
      const props = await getServerSideProps({
        req: { session: {} },
      } as GetServerSidePropsContext);

      expect(props).toEqual({ notFound: true });
    });
  });
});

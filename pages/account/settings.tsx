import { NextPage } from 'next';

import { withSessionSsr } from '@api/withSession';
import { PlayerAccountPage } from '@modules/PlayerAccountPage/PlayerAccountPage';

const PlayerAccount: NextPage = () => {
  return <PlayerAccountPage />;
};

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const player = req.session.player || null;

  if (!req.session?.player?.playerId) {
    return { notFound: true };
  }

  return {
    props: { player },
  };
});

export default PlayerAccount;

import { HomePage } from '@modules/HomePage/HomePage';

import { EmptyLayout } from '../layouts/EmptyLayout';

const Home = () => {
  return <HomePage />;
};

Home.layout = EmptyLayout;

export default Home;

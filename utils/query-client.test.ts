import { QueryClient } from 'react-query';

import { createQueryClient } from './query-client';

describe('query-client', () => {
  it('should return QueryClient', () => {
    const queryClient = createQueryClient();

    expect(queryClient).toBeInstanceOf(QueryClient);
  });
});

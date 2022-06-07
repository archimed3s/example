// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { setConfig } from 'next/config';

import config from './next.config';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      API_PRODUCTION_URL: string;
    }
  }
}

process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:3000';

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig(config);

// Mock next router
jest.mock('next/dist/client/router', () => require('next-router-mock'));

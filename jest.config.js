module.exports = {
  setupFilesAfterEnv: ['./jest-setup.ts'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    resources: 'usable',
    runScripts: 'dangerously',
  },
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': `<rootDir>/__mocks__/fileMock.js`,

    // Path aliases
    '^@components(.*)$': '<rootDir>/components$1',
    '^@pages(.*)$': '<rootDir>/pages$1',
    '^@api(.*)$': '<rootDir>/api$1',
    '^@utils(.*)$': '<rootDir>/utils$1',
    '^@modules(.*)$': '<rootDir>/modules$1',
    '^@sharedTypes(.*)$': '<rootDir>/types$1',
    '^@common(.*)$': '<rootDir>/common$1',
    '^@hooks(.*)$': '<rootDir>/hooks$1',
    '^@lib(.*)$': '<rootDir>/lib$1',
    '^@theme(.*)$': '<rootDir>/theme$1',
  },
  collectCoverage: false,
  coveragePathIgnorePatterns: [
    'jest.config.js',
    'next.config.js',
    'pages/_document.ts',
    'lib',
    'pages/api', // TODO: Add tests
    'cypress',
    'e2e',
    'theme.ts',
    'sentry.server.config.js',
    'sentry.client.config.js',
    '.next',
    'pages/_app.tsx',
    '__mocks__/*',
    'coverage/*',
    '__nocov__/*',
  ],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  globalSetup: '<rootDir>/test.env.js',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/cypress/', '<rootDir>/e2e/'],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
};

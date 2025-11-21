module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__integration__/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testTimeout: 30000, // 30 seconds timeout for integration tests
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
    '!src/**/__tests__/**',
    '!src/**/__integration__/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};


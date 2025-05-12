import { pathsToModuleNameMapper, type JestConfigWithTsJest } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  collectCoverage: true,
  testEnvironment: 'jest-environment-jsdom',
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  globals: {
    fetch: global.fetch
  },
  testPathIgnorePatterns: ['/node_modules/', '/__mocks__/']
};

export default config;

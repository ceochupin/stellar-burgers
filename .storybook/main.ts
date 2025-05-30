import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions'
  ],
  webpackFinal: async (config) => {
    config.resolve
      ? (config.resolve.alias = {
          ...config.resolve.alias,
          '@pages': path.resolve(__dirname, '../src/pages'),
          '@components': path.resolve(__dirname, '../src/components'),
          '@utils-types': path.resolve(__dirname, '../src/utils/types'),
          '@api': path.resolve(__dirname, '../src/utils/burger-api'),
          '@slices': path.resolve(__dirname, '../src/services/slices'),
          '@selectors': path.resolve(__dirname, '../src/services/selectors'),
          '@redux-store': path.resolve(__dirname, '../src/services/store'),
          '@redux-types': path.resolve(__dirname, '../src/services/types'),
          '@cookie': path.resolve(__dirname, '../src/utils/cookie'),
          '@hooks': path.resolve(__dirname, './src/services/hooks'),
          '@constans': path.resolve(__dirname, './src/utils/constants')
        })
      : null;
    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true
      }
    }
  },
  docs: {
    autodocs: 'tag'
  }
};
export default config;

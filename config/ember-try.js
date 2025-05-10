'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  const ember3Deps = {
    'ember-maybe-import-regenerator': '^1.0.0',
    'ember-qunit': '^5.1.5',
    '@ember/test-waiters': '^2.4.5',
    '@ember/test-helpers': '^2.6.0',
    'ember-resolver': '^8.0.3',
    // Compat Upgrades
    'ember-cli': '~4.12.0',
    'ember-auto-import': '^2.10.0',
    // Not needed
    'ember-fetch': null,
    'ember-cli-app-version': null,
  };

  return {
    usePnpm: true,
    scenarios: [
      {
        name: 'ember-3.25',
        npm: {
          devDependencies: {
            ...ember3Deps,
            'ember-source': '~3.25.0',
          },
        },
      },
      {
        name: 'ember-3.28-lts',
        npm: {
          ...ember3Deps,
          devDependencies: {
            'ember-source': '~3.28.0',
          },
        },
      },
      {
        name: 'first-inert',
        npm: {
          devDependencies: {
            'ember-source': '4.5.0-alpha.4',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
            'ember-cli': '^5.0.0',
            '@glint/template': '^1.0.0',
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          dependencies: {
            'ember-auto-import': '^2.0.0',
          },
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
            '@glint/template': '^1.0.0',
            'ember-cli': '^5.0.0',
            webpack: '^5.0.0',
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          dependencies: {
            'ember-auto-import': '^2.0.0',
          },
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
            '@glint/template': '^1.0.0',
            'ember-cli': '^5.0.0',
            webpack: '^5.0.0',
          },
        },
      },
      {
        name: 'ember-could-get-used-to-this',
        npm: {
          devDependencies: {
            'ember-could-get-used-to-this': '^1.0.1',
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};

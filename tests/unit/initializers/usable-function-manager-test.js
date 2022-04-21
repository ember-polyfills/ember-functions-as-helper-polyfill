import Application from '@ember/application';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';

import { dependencySatisfies, importSync, macroCondition } from '@embroider/macros';
import config from 'dummy/config/environment';
import Resolver from 'ember-resolver';

if (macroCondition(dependencySatisfies('ember-source', '^4.5.0-alpha.4 || ^4.5.0'))) {
  console.debug('usable-function-manager test skipped');
} else {
  const { initialize } = importSync('dummy/initializers/usable-function-manager');

  module('Unit | Initializer | usable-function-manager', function (hooks) {
    hooks.beforeEach(function () {
      this.TestApplication = class TestApplication extends Application {
        modulePrefix = config.modulePrefix;
        podModulePrefix = config.podModulePrefix;
        Resolver = Resolver;
      };
      this.TestApplication.initializer({
        name: 'initializer under test',
        initialize,
      });

      this.application = this.TestApplication.create({ autoboot: false });
    });

    hooks.afterEach(function () {
      run(this.application, 'destroy');
    });

    // TODO: Replace this with your real tests.
    test('it works', async function (assert) {
      await this.application.boot();

      assert.ok(true);
    });
  });
}

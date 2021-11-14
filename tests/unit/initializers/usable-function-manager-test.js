import Application from '@ember/application';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';

import config from 'dummy/config/environment';
import { initialize } from 'dummy/initializers/usable-function-manager';
import Resolver from 'ember-resolver';

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

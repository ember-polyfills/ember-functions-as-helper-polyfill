import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { dependencySatisfies, macroCondition } from '@embroider/macros';

module('Unit | inert', function (hooks) {
  setupTest(hooks);

  function hasPolyfill() {
    let initializers = ['install-function-helper-manager', 'usable-function-manager'];

    return Object.keys(window.requirejs.entries).some((e) =>
      initializers.some((name) => e.includes(name))
    );
  }

  if (macroCondition(dependencySatisfies('ember-source', '^4.5.0-alpha.4 || ^4.5.0'))) {
    test('polyfill is inert', function (assert) {
      assert.false(hasPolyfill(), 'no polyfill');
    });
  } else {
    test('polyfill is present', function (assert) {
      assert.true(hasPolyfill(), 'has polyfill');
    });
  }
});

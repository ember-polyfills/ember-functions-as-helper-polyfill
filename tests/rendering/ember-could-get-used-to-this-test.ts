/**
 * The ember-could-get-used-to-this implementation only passed positional params
 * https://github.com/tracked-tools/ember-could-get-used-to-this/blob/master/addon/-private/functions.js
 *
 * which means that the default-helper-manager's expected behavior _extends_
 * the behavior of ember-could-get-used-to-this, so while we cannot have
 * two helper-managers registered to Function.prototype, we can prevent
 * ember-could-get-used-to-this' helper-manager from being registered and code
 * using ember-could-get-used-to-this should still work the same.
 */
import { tracked } from '@glimmer/tracking';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { moduleExists } from '@embroider/macros';

if (moduleExists('ember-could-get-used-to-this')) {
  module('Compatibility with ember-could-get-used-to-this', function (hooks) {
    setupRenderingTest(hooks);

    test('ecgutt-style function-helpers still work', async function (assert) {
      class Demo {
        @tracked num = 3;

        double = (x: number) => x * 2;
      }

      let demo = new Demo();

      this.setProperties({ demo });

      await render(hbs`{{this.demo.double this.demo.num}}`);

      assert.dom().hasText('6');

      demo.num = 5;
      await settled();

      assert.dom().hasText('10');
    });

    test('helpers can receive named args', async function (assert) {
      assert.expect(3);

      class TrackedObject {
        @tracked a = 0;
        @tracked b = 1;
      }

      class Demo {
        @tracked num = 3;
        @tracked sourceObject = new TrackedObject();

        myHelper = (x: number, opts: TrackedObject) => {
          assert.strictEqual(x, 3);
          assert.strictEqual(opts.a, 0);
          assert.strictEqual(opts.b, 1);
        };
      }

      let demo = new Demo();

      this.setProperties({ demo });

      await render(
        hbs`
          {{this.demo.myHelper
              this.demo.num
              a=this.demo.sourceObject.a
              b=this.demo.sourceObject.b
          }}`
      );
    });
  });
}

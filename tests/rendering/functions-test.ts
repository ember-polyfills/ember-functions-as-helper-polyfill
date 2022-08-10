import { tracked } from '@glimmer/tracking';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

interface Owner {
  lookup(
    key: string,
    options?: {
      singleton?: boolean | undefined;
      instantiate?: boolean | undefined;
    }
  ): unknown;
}

module('function helpers', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
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

  test('positional arguments are always consumed', async function (assert) {
    class Demo {
      @tracked num = 3;
      @tracked unused = 5;

      myHelper = (x: number) => {
        assert.step(`myHelper: ${x}`);
      };
    }

    let demo = new Demo();

    this.setProperties({ demo });

    await render(hbs`{{this.demo.myHelper this.demo.num this.demo.unused}}`);

    demo.unused = 5;
    await settled();

    assert.verifySteps(['myHelper: 3', 'myHelper: 3']);
  });

  test('named arguments are consumed only when accessed', async function (assert) {
    class TrackedObject {
      @tracked a = 0;
      @tracked b = 1;
    }

    class Demo {
      @tracked num = 3;
      @tracked sourceObject = new TrackedObject();

      myHelper = (x: number, opts: TrackedObject) => {
        assert.step(`myHelper: ${x}`);

        if (x === 4) {
          assert.step(`x is 4, and opts.a is ${opts.a}`);
        }
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

    demo.sourceObject.a = 5;
    await settled();

    assert.verifySteps(['myHelper: 3']);

    demo.num = 4;
    await settled();

    demo.sourceObject.a = 6;
    await settled();

    assert.verifySteps([
      'myHelper: 4',
      'x is 4, and opts.a is 5',
      'myHelper: 4',
      'x is 4, and opts.a is 6',
    ]);
  });

  test('the owner is bound as `this` context', async function (assert) {
    function lookup(
      this: Owner,
      identifier: string,
      options?: object
    ): unknown {
      return this.lookup(identifier, options);
    }

    const testIdentifier = 'test-value:foo';
    const testValue = 'foo';

    this.owner.register(
      testIdentifier,
      { string: testValue },
      { instantiate: false }
    );

    this.setProperties({ lookup, testIdentifier });

    await render(hbs`{{get (this.lookup this.testIdentifier) "string"}}`);

    assert.dom().hasText(testValue);
  });
});

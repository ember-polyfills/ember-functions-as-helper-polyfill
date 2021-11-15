/* eslint-disable @typescript-eslint/ban-types */
// typed-ember doesn't have types for `@ember/helper` yet
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { capabilities as helperCapabilities, setHelperManager } from '@ember/helper';

import type { Arguments } from '../-private/local-glimmer-interfaces-types';

export function initialize(/* appInstance */) {
  // noop.
  // we just want the host app to import this file
  // (because the default manager behavior is in glimmer-vm,
  //  and I don't know how to monkey-patch ESM... (I don't think I'd want to either? (danger!)))
}

export default {
  initialize,
};

type FnArgs<Args extends Arguments = Arguments> =
  | [...Args['positional'], Args['named']]
  | [...Args['positional'], {}];

interface FunctionHelperState<Args extends Arguments = Arguments> {
  fn: <Return>(...args: FnArgs<Args>) => Return;
  args: Args;
}

export class FunctionHelperManager<State extends FunctionHelperState> {
  capabilities = helperCapabilities('3.23', {
    hasValue: true,
    hasDestroyable: false,
    hasScheduledEffect: false,
  });

  createHelper(fn: State['fn'], args: State['args']) {
    return { fn, args };
  }

  getValue({ fn, args }: State) {
    let argsForFn: FnArgs<Arguments> = [
      ...args.positional,
      Object.keys(args.named).length > 0 ? args.named : {},
    ];

    return fn(...argsForFn);
  }

  getDebugName(fn: State['fn']) {
    return fn.name || '(anonymous function)';
  }
}

const FUNCTIONAL_HELPER_MANAGER = new FunctionHelperManager();

setHelperManager(() => FUNCTIONAL_HELPER_MANAGER, Function.prototype);

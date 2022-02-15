/* eslint-disable @typescript-eslint/no-explicit-any */
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
  | [...Args['positional']];

type AnyFunction = (...args: any[]) => unknown;

interface State {
  fn: AnyFunction;
  args: Arguments;
}

export class FunctionHelperManager {
  capabilities = helperCapabilities('3.23', {
    hasValue: true,
    hasDestroyable: false,
    hasScheduledEffect: false,
  });

  createHelper(fn: AnyFunction, args: Arguments): State {
    return { fn, args };
  }

  getValue({ fn, args }: State): unknown {
    if (Object.keys(args.named).length > 0) {
      let argsForFn: FnArgs<Arguments> = [...args.positional, args.named];

      return fn(...argsForFn);
    }

    return fn(...args.positional);
  }

  getDebugName(fn: AnyFunction): string {
    if (fn.name) {
      return `(helper function ${fn.name})`;
    }

    return '(anonymous helper function)';
  }
}

const FUNCTIONAL_HELPER_MANAGER = new FunctionHelperManager();

setHelperManager(() => FUNCTIONAL_HELPER_MANAGER, Function.prototype);

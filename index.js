'use strict';

const VersionChecker = require('ember-cli-version-checker');

const MINIMUM_VERSION = '4.5.0-alpha.4';

module.exports = {
  name: require('./package').name,

  _usePolyfill: flag(process.env.USE_DEFAULT_HELPER_MANAGER_POLYFILL),

  options: {
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
  },

  usePolyfill() {
    if (this._usePolyfill === undefined) {
      let version = new VersionChecker(this.project).for(`ember-source`);

      this._usePolyfill = version.lt(MINIMUM_VERSION);
    }

    return this._usePolyfill;
  },

  treeForAddon() {
    if (this.usePolyfill()) {
      return this._super.treeForAddon.apply(this, arguments);
    }
  },

  treeForApp() {
    if (this.usePolyfill()) {
      return this._super.treeForApp.apply(this, arguments);
    }
  },
};

const FALSE = ['false', 'disable', 'no', 'off', '0'];

function flag(flag) {
  if (flag === undefined) {
    return undefined;
  } else if (FALSE.includes(flag.toLowerCase())) {
    return false;
  } else {
    return true;
  }
}

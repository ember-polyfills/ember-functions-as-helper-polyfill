# ember-functions-as-helper-polyfill

[![npm version](https://badge.fury.io/js/ember-functions-as-helper-polyfill.svg)](https://badge.fury.io/js/ember-functions-as-helper-polyfill)
[![CI](https://github.com/NullVoxPopuli/ember-functions-as-helper-polyfill/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/NullVoxPopuli/ember-functions-as-helper-polyfill/actions/workflows/ci.yml)


Use plain functions as helpers.
Polyfill for [RFC: 756 | Default Helper Manager](https://github.com/emberjs/rfcs/pull/756).
On Ember.js versions with native support for the feature (4.5+), this addon is inert.

## Compatibility

* Ember.js v3.25 or above
* Ember CLI v3.25 or above
* ember-auto-import v1 or above


## Installation

```
ember install ember-functions-as-helper-polyfill
```

## Usage

Define a function (doesn't have to be in a component)

```js
import Component  from '@glimmer/component';

export default class MyComponent extends Component {
  myHelper = x => x * 2;
}
```
```hbs
{{this.myHelper 3}}
^ prints 6
```

Named arguments will all be grouped together in the last argument of the helper:

```js
import Component  from '@glimmer/component';

export default class MyComponent extends Component {
  doStuff = (x, options) => {
    console.log(x, options.optionA, options.optionB);
  };
}
```
```hbs
{{this.doStuff 3 optionA=2 optionB=3}}
```


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).

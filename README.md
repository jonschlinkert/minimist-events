# minimist-events [![NPM version](https://badge.fury.io/js/minimist-events.svg)](http://badge.fury.io/js/minimist-events)

> Add event emitting to minimist, ~30 sloc.

**Example usage**

```js
var cli = require('minimist-events')(require('minimist'));

cli.on('foo', function(val) {
  // do something when `foo` is emitted
});

cli.parse(process.argv.slice(2));
```

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i minimist-events --save
```

## Usage

Pass your own [minimist](https://github.com/substack/minimist):

```js
var minimist = require('minimist');
var cli = require('minimist-events')(minimist);
```

**Setup listeners**

Then setup listeners for any arguments you want to listen for:

```js
cli.on('foo', function(val) {
  // do something when `foo` is emitted
});

cli.on('bar', function(val) {
  // do something when `bar` is emitted
});

cli.on('baz', function(val) {
  // do something when `baz` is emitted
});

cli.on('_', function(arr) {
  // do something when non-options args are emitted
});
```

**Parse**

Next, parse arguments with [minimist](https://github.com/substack/minimist):

```js
// the `parse` method is a proxy to minimist, 
// so pass any minimist args to this method
cli.parse(process.argv.slice(2));
```

**Complete example**

Assuming `--foo=bar a b c` is passed on the command line:

```js
var minimist = require('minimist');
var cli = require('minimist-events')(minimist);

cli.on('foo', function(val) {
  // - `val`: 'bar'
});
cli.on('a', function(idx, arr) {
  // - `idx`: '0'
  // - `arr`: ['a', 'b', 'c']
});
cli.on('b', function(idx, arr) {
  // - `idx`: '1'
  // - `arr`: ['a', 'b', 'c']
});
cli.on('c', function(idx, arr) {
  // - `idx`: '2'
  // - `arr`: ['a', 'b', 'c']
});

cli.parse(process.argv.slice(2));
```

**Tip**

`process.argv` is just an array, so you can mock command line arguments by just passing an array to `cli.parse()` (or minimist if you're not using this lib).

Example:

```js
cli.parse(['--foo', '--bar=baz', 'a', 'b', 'c']);
```

## argv

Parsed arguments are exposed on the `argv` property:

**Example:**

Assuming you pass `--foo --bar=baz a b c` on the command line:

```js
cli.parse(process.argv.slice(2));
var args = cli.args;
//=> { _: [ 'a', 'b', 'c' ], foo: true, bar: 'baz' }
```

## options

### help

The only option that `minimist-events` currently takes is `help`.

When `help: true` is defined, and no command line arguments are passed (meaning that both the `_` array and options args are empty), then the `help` event is emitted.

**Example**

```js
var minimist = require('minimist');
var cli = require('minimist-events')(minimist, {help: true});

cli.on('help', function () {
  console.log('Help!');
});

// no args passed
cli.parse([]);
// cli.args => {_: []}
```

## Events

### Array arguments

An event is emitted for the `_` array:

**params**

* `arr`: the `_` array

```js
cli.on('_', function(arr) {
  // ['a', 'b', 'c']
});

cli.parse(['--foo', 'a', 'b', '--bar=baz', 'c']);
```

#### Array items

An event is emitted for each item in the `_` array.

**params**

* `i`: array index
* `arr`: the `_` array

```js
cli.on('a', function(i, arr) {
  // 0
});
cli.on('b', function(i, arr) {
  // 1
});
cli.on('c', function(i, arr) {
  // 2
});

cli.parse(['a', 'b', 'c']);
```

### Array index

An event is also emitted for each array index:

**params**

* `item`: array item
* `arr`: the `_` array

```js
cli.on(0, function(item, arr) {
  // 'a'
});
cli.on(1, function(item, arr) {
  // 'b'
});
cli.on(2, function(item, arr) {
  // 'c'
});

cli.parse(['a', 'b', 'c']);
```

### Option arguments

An event is emitted for each option.

**Params**

* `val`: the option value
* `opts`: the args object

```js
cli.on('a', function(val) {
 //=> 'foo'
});

cli.on('b', function(val) {
 //=> 'bar'
});

cli.on('c', function(val) {
 //=> 'baz'
});

cli.parse(['--a=foo', '--b=bar', '--c=baz']);
```

## Related projects

[minimist](https://github.com/substack/minimist): parse argument options

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/minimist-events/issues/new)

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 04, 2015._
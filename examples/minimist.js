var argv = require('..')(require('minimist'));
var args = argv(['--foo', '--bar=baz', 'a', 'b', 'c']);
console.log(args);
//=> { _: [ 'a', 'b', 'c' ], foo: true, bar: 'baz' }

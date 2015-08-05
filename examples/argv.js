var cli = require('..')(require('minimist'));
console.log(cli(process.argv.slice(2)))

cli.parse(['--foo', '--bar=baz', 'a', 'b', 'c']);

var args = cli.argv;
console.log(args);
//=> { _: [ 'a', 'b', 'c' ], foo: true, bar: 'baz' }

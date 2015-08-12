var minimist = require('minimist');
var cli = require('..')({help: true})(minimist)
console.log(cli(process.argv.slice(2)))

cli(['--foo', '--bar=baz', 'a', 'b', 'c']);

console.log(cli.argv);
//=> { _: [ 'a', 'b', 'c' ], foo: true, bar: 'baz' }

var minimist = require('minimist');
var cli = require('..')(minimist);


cli.on('_', function (arr) {
  console.log('_:', arr);
});

var args = process.argv.slice(2);
cli(args.length ? args : ['help']);

console.log(cli.argv);

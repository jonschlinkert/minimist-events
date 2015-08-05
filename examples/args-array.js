var minimist = require('minimist');
var cli = require('..')(minimist);


cli.on('_', function (arr) {
  console.log('args array:', arr);
});

cli.parse(process.argv.slice(2));

var args = cli.args;

console.log(cli)

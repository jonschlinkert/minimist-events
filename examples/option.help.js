var minimist = require('minimist');
var cli = require('..')(minimist, {help: true});

cli.on('help', function () {
  console.log('Help!');
});

cli(process.argv.slice(2));

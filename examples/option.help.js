var minimist = require('minimist');
var cli = require('..')(minimist, {help: true});


cli.on('help', function () {
  console.log('Help meeee!');
});


cli.parse(process.argv.slice(2));

var plugins = require('minimist-plugins');
var cli = plugins(require('minimist'))
  .use(require('..')({help: true}));

cli.on('help', function () {
  console.log('Help!');
});

cli.parse([], function() {});
console.log(cli);

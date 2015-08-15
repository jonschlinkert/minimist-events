var plugins = require('minimist-plugins');
var cli = plugins(require('minimist'))
  .use(require('..')());

cli.on('_', function (arr) {
  console.log('_:', arr);
});

var args = process.argv.slice(2);

cli.parse(args.length ? args : ['help'], function (err, argv) {
  console.log(argv);
});

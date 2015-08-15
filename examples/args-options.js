var plugins = require('minimist-plugins');
var cli = plugins(require('minimist'))
  .use(require('minimist-expand'))
  .use(require('..')());

cli.on('foo', function (val) {
  console.log('foo:', val);
});

cli.on('bar', function (val) {
  console.log('bar:', val);
});

cli.on('baz', function (val) {
  console.log('baz:', val);
});

cli.on('quux', function (val) {
  console.log('quux:', val);
});

var args = process.argv.slice(2);
if (!args.length) {
  args = ['--foo=a', '--bar=b', '--baz=c', '--quux', 'fez', '--d:e'];
}

cli.parse(args, {alias: {task: 't'}}, function (err, argv) {
  console.log(argv);
});

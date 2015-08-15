var visit = require('collection-visit');
var plugins = require('minimist-plugins');
var app = require('./app');

var cli = plugins(require('minimist'))
  .use(require('minimist-expand'))
  .use(require('..')());


cli.on('_', function (val) {
  cli.emit('task', val);
});

cli.on('set', function (val) {
  visit(app, 'set', val);
  console.log('set', val);
});

cli.on('get', function (val) {
  visit(app, 'get', val);
  console.log('get', val);
});

cli.on('del', function (val) {
  visit(app, 'del', val);
  console.log('del', val);
});

// cli.on('*', function (key, value) {
//   console.log(key, value);
// });

var args = process.argv.slice(2);
if (!args.length) {
  args = ['--set=a:b', '--set=c:d', '--get=a', '--del=a', '--set=e:f+g:h+i:j'];
}

cli.parse(args, {alias: {task: 't'}}, function (err, argv) {
  console.log(argv);
});


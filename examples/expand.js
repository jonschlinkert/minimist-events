var app = require('./app');
var visit = require('collection-visit');
var minimist = require('minimist');
var expand = require('minimist-expand')(minimist);
var cli = require('..')(expand);


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

cli(args.length ? args : ['--set=a:b', '--set=c:d', '--get=a', '--del=a', '--set=e:f+g:h+i:j'], {
  alias: {task: 't'}
});

console.log(app.cache)

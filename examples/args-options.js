var minimist = require('minimist');
var cli = require('..')(minimist);


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


cli.parse(['--foo=a', '--bar=b', '--baz=c', '--quux', 'fez', '--d:e']);
console.log(cli.argv)



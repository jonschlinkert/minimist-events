var expand = require('expand-object');
var minimist = require('minimist');
var cli = require('..')(minimist, {
  postProcess: function (argv) {
    argv = splitArgs(argv);
    return splitOpts(argv);
  }
});


function splitOpts(argv) {
  var res = {};
  for (var key in argv) {
    if (argv.hasOwnProperty(key)) {
      var val = argv[key];

      if (~key.indexOf(':') && val === true) {
        var parts = key.split(':');
        res[parts[0]] = parts[1];

      } else if (~val.indexOf(':')) {
        res[key] = expand(val);

      } else {
        res[key] = val;
      }
    }
  }
  return res;
}

function splitArgs(argv) {
  var arr = argv._.slice(0);
  var len = arr.length, i = -1;
  var num = -1;
  while (++i < len) {
    var arg = arr[i];
    var val = arg.split(':');
    if (val.length > 1) {
      argv[val[0]] = val[1];
      argv._.splice(i - (++num), 1);
    }
  }
  return argv;
}


// cli.on('foo', function (val) {
//   console.log('foo:', val);
// });

// cli.on('bar', function (val) {
//   console.log('bar:', val);
// });

// cli.on('baz', function (val) {
//   console.log('baz:', val);
// });

// cli.on('quux', function (val) {
//   console.log('quux:', val);
// });


// cli.parse(['--foo=a', '--set:foo=bar', 'name=bar', '--bar=b', '--baz=c', '--quux', 'fez', 'a:b', 'c:d', 'e:f', 'g:h', 'i:j', '--h:i']);

cli.parse(['--set=a.b.c.d:e', '--set=f:g']);
console.log(cli.argv)

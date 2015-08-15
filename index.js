/*!
 * minimist-events <https://github.com/jonschlinkert/minimist-events>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

function plugin(opts) {
  opts = opts || {};

  return function eventsPlugin(cli) {
    return function (argv, next) {
      var keys = Object.keys(argv);
      cli.argv = argv;

      if (opts.help && !argv._.length && keys.length === 1) {
        cli.emit('help');
        return next(null, argv);
      }

      // ensure that `_` args are emitted first
      cli.emit('_', argv._);
      cli.emit('*', '_', argv._);

      argv._.forEach(function (k, i) {
        cli.emit(i, k, argv._);
        cli.emit(k, i, argv._);
      });

      // after `_`, emit options args
      keys.forEach(function (key) {
        if (key === '_') return;
        var val = argv[key];
        cli.emit(key, val);
        cli.emit('*', key, val);
      });

      next(null, argv);
    };
  };
}


/**
 * Expose `plugin`
 */

module.exports = plugin;

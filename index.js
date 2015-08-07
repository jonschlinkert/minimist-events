/*!
 * minimist-events <https://github.com/jonschlinkert/minimist-events>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Emitter = require('component-emitter');
var forward = require('forward-object');
var extend = require('extend-shallow');

module.exports = function (options) {
  if (typeof options === 'function') {
    return events.apply(events, arguments);
  }

  function events(minimist, opts) {
    opts = extend({}, options, opts);
    var fn = minimist;

    if (typeof fn !== 'function') {
      throw new TypeError('expected minimist to be a function.');
    }

    opts = opts || {};

    var proxy = Emitter(function () {
      var argv = fn.apply(fn, arguments);
      if (typeof opts.postProcess === 'function') {
        argv = opts.postProcess(argv);
      }

      var keys = Object.keys(argv);
      proxy.argv = argv;

      if (opts.help && !argv._.length && keys.length === 1) {
        proxy.emit('help');
        return argv;
      }

      keys.forEach(function (key) {
        var val = argv[key];
        proxy.emit(key, val);
        proxy.emit('*', key, val);

        if (key === '_') {
          val.forEach(function (k, i) {
            proxy.emit(i, k, val);
            proxy.emit(k, i, val);
          });
        }
      });

      proxy.emit('end');
      return argv;
    });

    forward(proxy, fn);
    return proxy;
  };

  return minimistEvents;
};

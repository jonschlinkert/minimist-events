/*!
 * minimist-events <https://github.com/jonschlinkert/minimist-events>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Emitter = require('component-emitter');

module.exports = function(minimist, options) {
  if (typeof minimist !== 'function') {
    throw new TypeError('expected minimist to be a function.');
  }

  options = options || {};
  var emitter = Emitter(minimist);

  emitter.parse = function () {
    var argv = emitter.apply(emitter, arguments);
    if (typeof options.postProcess === 'function') {
      argv = options.postProcess(argv);
    }

    var keys = Object.keys(argv);
    emitter.argv = argv;

    if (options.help && !argv._.length && keys.length === 1) {
      emitter.emit('help');
    }

    keys.forEach(function (key) {
      var val = argv[key];
      emitter.emit(key, val);
      emitter.emit('*', key, val);
      if (key === '_') {
        val.forEach(function (k, i) {
          emitter.emit(i, k, val);
          emitter.emit(k, i, val);
        });
      }
    });
    return argv;
  };
  return emitter;
};

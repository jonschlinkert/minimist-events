'use strict';

var assert = require('assert');
var minimist = require('minimist');
var cmd = require('./');
var cli;

describe('minimist', function () {
  beforeEach(function () {
    cli = cmd(minimist);
    cli._callbacks = {};
  });

  it('should emit the args in the _ array:', function () {
    cli.on('_', function (arr) {
      assert.deepEqual(arr, ['a', 'b', 'c']);
    });
    cli.parse(['a', 'b', 'c']);
  });

  it('should expose args on the `argv` object:', function () {
    cli.parse(['a', 'b', 'c']);
    assert.deepEqual(cli.argv._, ['a', 'b', 'c']);
  });

  it('should expose options on the `argv` object:', function () {
    cli.parse(['a', 'b', 'c', '--foo=bar']);
    assert.equal(cli.argv.foo, 'bar');
  });

  it('should emit `end` after all args are emitted:', function () {
    var i = 0;
    cli.on('end', function () {
      i++;
    });
    cli.parse(['a', 'b', 'c', '--foo=bar']);
    assert.equal(i, 1);
  });

  it('should emit each item in the _ array:', function () {
    var actual = [];
    cli.on('a', function (i) {
      actual.push(i);
      assert.equal(i, 0);
    });
    cli.on('b', function (i) {
      actual.push(i);
      assert.equal(i, 1);
    });
    cli.on('c', function (i) {
      actual.push(i);
      assert.equal(i, 2);
    });
    cli.parse(['a', 'b', 'c']);
    assert.deepEqual(actual, [0, 1, 2]);
  });

  it('should emit items in the _ array by index:', function () {
    var actual = [];
    cli.on(0, function (val) {
      actual.push(val);
      assert.equal(val, 'a');
    });
    cli.on(1, function (val) {
      actual.push(val);
      assert.equal(val, 'b');
    });
    cli.on(2, function (val) {
      actual.push(val);
      assert.equal(val, 'c');
    });
    cli.parse(['a', 'b', 'c']);
    assert.deepEqual(actual, ['a', 'b', 'c']);
  });

  it('should expose the _ array as the second arg:', function () {
    var actual = [];
    cli.on('a', function (i, arr) {
      actual.push(i);
      assert.deepEqual(arr, ['a', 'b', 'c']);
    });
    cli.on('b', function (i, arr) {
      actual.push(i);
      assert.deepEqual(arr, ['a', 'b', 'c']);
    });
    cli.on('c', function (i, arr) {
      actual.push(i);
      assert.deepEqual(arr, ['a', 'b', 'c']);
    });
    cli.parse(['a', 'b', 'c']);
    assert.deepEqual(actual, [0, 1, 2]);
  });

  it('should emit the value of `key`:', function (done) {
    cli.on('foo', function (val) {
      assert.equal(val, 'bar');
      done();
    });
    cli.parse(['--foo=bar']);
  });

  it('should emit the value and array index for duplicate keys:', function () {
    var i = 0;
    cli.on('foo', function (val) {
      if (i === 0) {
        assert.equal(val, 0);
      } else {
        assert.equal(val, 'bar');
      }
      i++;
    });
    cli.parse(['--foo=bar', 'foo']);
  });

  it('should use minimist aliases:', function (done) {
    cli.on('f', function (val) {
      assert.equal(val, 'bar');
      done();
    });
    cli.parse(['--foo=bar'], {
      alias: {
        f: 'foo'
      }
    });
  });

  it('should emit `help` when `options.help` is defined and no args:', function (done) {
    cli = cmd(minimist, {help: true});
    var i = 0;
    cli.on('help', function () {
      i++;
      done();
    });
    cli.parse([]);
    assert.equal(i, 1);
  });
});

/* deps: mocha */

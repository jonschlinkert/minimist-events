'use strict';

var assert = require('assert');
var minimist = require('minimist');
var plugins = require('minimist-plugins');
var events = require('./');
var cli;

describe('minimist', function () {
  beforeEach(function () {
    cli = plugins(minimist);
  });

  it('should emit the args in the _ array:', function () {
    cli.use(events())
    cli.on('_', function (arr) {
      assert.deepEqual(arr, ['a', 'b', 'c']);
    });
    cli.parse(['a', 'b', 'c'], function (err, res) {
      assert(Array.isArray(res._));
    });
  });

  it('should emit each item in the _ array:', function (done) {
    cli.use(events());

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

    cli.parse(['a', 'b', 'c'], function (err, res) {
      assert.deepEqual(actual, [0, 1, 2]);
      done();
    });
  });

  it('should emit items in the _ array by index:', function (done) {
    cli.use(events());

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
    cli.on('end', function (val) {
      assert.deepEqual(actual, ['a', 'b', 'c']);
    });

    cli.parse(['a', 'b', 'c'], done);
  });

  it('should expose the _ array as the second arg:', function (done) {
    cli.use(events());

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
    cli.on('end', function (i, arr) {
      assert.deepEqual(actual, [0, 1, 2]);
    });

    cli.parse(['a', 'b', 'c'], function (err, res) {
      assert.deepEqual(actual, [0, 1, 2]);
      done();
    });
  });

  it('should emit the value of `key`:', function (done) {
    cli.use(events());

    cli.on('foo', function (val) {
      assert.equal(val, 'bar');
    });

    cli.parse(['--foo=bar'], done);
  });

  it('should emit the value and array index for duplicate keys:', function (done) {
    cli.use(events());
    var i = 0;

    cli.on('foo', function (val) {
      if (i === 0) {
        assert.equal(val, 0);
      } else {
        assert.equal(val, 'bar');
      }
      i++;
    });
    cli.parse(['--foo=bar', 'foo'], done);
  });

  it('should use minimist aliases:', function (done) {
    cli = plugins(minimist);
    cli.use(events());
    cli.on('f', function (val) {
      assert.equal(val, 'bar');
      done();
    });
    cli.parse(['--foo=bar'], {alias: {f: 'foo'}}, function (err, res) {
      assert.equal(res.foo, 'bar');
    });
  });

  it('should emit `help` when `options.help` is defined and no args:', function (done) {
    cli = plugins(minimist);
    cli.use(events({help: true}));
    var i = 0;
    cli.on('help', function () {
      i++;
    });
    cli.parse([], function (err, res) {
      assert.equal(i, 1);
      done();
    });
  });
});

/* deps: mocha */

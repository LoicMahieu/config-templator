'use strict';

var templator = require('../lib/config-templator');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var src = {
  str: 'bar',
  str2: '<%= str %>',
  arr: [1, 2, 3],
  arr2: '<%= arr %>',
  obj: {
    test: true
  },
  obj2: '<%= obj %>',
  nested: {
    theStr: '<%= str %>',
    arr2: '<%= arr2 %>'
  }
};

var target = {
  str: 'bar',
  str2: 'bar',
  arr: [1, 2, 3],
  arr2: [1, 2, 3],
  obj: {
    test: true
  },
  obj2: {
    test: true
  },
  nested: {
    theStr: 'bar',
    arr2: [1, 2, 3]
  }
};

exports['config-templator'] = {
  setUp: function(done) {
    done();
  },

  '#flatten': function(test) {
    test.expect(1);
    test.deepEqual(templator.flatten(src), target, 'should be equal.');
    test.done();
  },

  '#get': function(test) {
    test.expect(1);
    test.equal(templator.get(src, 'nested.theStr'), 'bar', 'should be equal.');
    test.done();
  }
};

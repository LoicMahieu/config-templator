/*global describe: true, it: true*/

'use strict';

var expect = require('chai').expect;

var templator = require('../lib/config-templator');

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
  },
  port: 3000,
  port2: '<%- port %>',
  host: 'localhost:<%- port2 %>',
  fullURL: 'http://<%- host %>/app',
  fullURL2: '<%- fullURL %>/v2',

  nested2: {
    foo: '<%- fullURL2 %>/user'
  },

  appdir: '<%- dirname %>/app',
  express: {
    routesDir: '<%- appdir %>/routes'
  },
  dirname: 'path/to/app/dir'
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
  },
  port: 3000,
  port2: "3000",
  host: 'localhost:3000',
  fullURL: 'http://localhost:3000/app',
  fullURL2: 'http://localhost:3000/app/v2',

  nested2: {
    foo: 'http://localhost:3000/app/v2/user'
  },

  appdir: 'path/to/app/dir/app',
  express: {
    routesDir: 'path/to/app/dir/app/routes',
  },
  dirname: 'path/to/app/dir'
};


describe('config-templator', function () {
  
  it('#flatten', function (done) {
    var result = templator.flatten(src);
    expect(result).to.deep.equal(target);
    done();
  });

  it('#get', function (done) {
    var result = templator.get(src, 'nested.theStr');
    expect(result).to.equal('bar');
    done();
  });

});

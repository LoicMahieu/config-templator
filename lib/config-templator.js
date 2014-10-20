/*
 * config-templator
 * https://github.com/loicmahieu/config-templator
 *
 * Copyright (c) 2013 Loic Mahieu
 * Licensed under the MIT license.
 */

'use strict';

var ejs = require('ejs');

var namespace = require('./util/namespace');
var util = require('./util/util');


// Match '<%= FOO %>' where FOO is a propString, eg. foo or foo.bar but not
// a method call like foo() or foo.bar().
var propStringTmplRe = /^<%=\s*([a-z0-9_$]+(?:\.[a-z0-9_$]+)*)\s*%>$/i;

var cleanValue = function (value) {
  if (value === 'false') {
    value = false;
  }
  else if (value === 'true') {
    value = true;
  }
  return value;
};

var processRaw = function (raw, origin) {
  if (!origin) {
    origin = raw;
  }

  var hasReplacment;
  var recurse = function () {
    hasReplacment = false;

    return util.recurse(raw, function (value) {
      // If the value is not a string, return it.
      if (typeof value !== 'string') {
        return value;
      }

      // If possible, access the specified property via config.get, in case it
      // doesn't refer to a string, but instead refers to an object or array.
      var matches = value.match(propStringTmplRe);
      var result;
      if (matches) {
        result = cleanValue(namespace.get(origin, matches[1]));
        // If the result retrieved from the data wasn't null or undefined,
        // return it.
        if (result != null) {
          hasReplacment = true;
          return result;
        }
      }

      // If the replacment would not be catch by the simple RegExp above, try with EJS.
      var transformed = cleanValue(ejs.render(value, origin));

      // If the strings are differents, a replacement happened.
      hasReplacment = hasReplacment || (transformed !== value);

      return transformed;
    });
  };

  do {
    raw = recurse();
  } while (hasReplacment);

  return raw;
};



// Expand a config value recursively. Used for post-processing raw values
// already retrieved from the config.
exports.flatten = function flatten(data) {
  return processRaw(data);
};


exports.get = function get (data, key) {
  return processRaw(namespace.get(data, key), data);
};
# config-templator [![Build Status](https://secure.travis-ci.org/LoicMahieu/config-templator.png?branch=master)](http://travis-ci.org/loicmahieu/config-templator) [![Dependency Status](https://gemnasium.com/LoicMahieu/config-templator.png)](https://gemnasium.com/LoicMahieu/config-templator)

[![Greenkeeper badge](https://badges.greenkeeper.io/LoicMahieu/config-templator.svg)](https://greenkeeper.io/)

Dynamic replacement in object, inspired by GruntJS config

## Getting Started
Install the module with: `npm install config-templator`

## Documentation
_(Coming soon)_

## Examples

Flatten:

```javascript
var config = { foo: 'bar', baz: '<%= bar %>' };

var config-templator = require('config-templator');
config = config-templator.flatten(config); // { foo: 'bar', baz: 'bar' }
```

Get:

```javascript
config = config-templator.get(config, 'baz'); // bar
```

### More examples

```javascript
var config = { port: 3000, uri: 'localhost:<%= port %>' };

var config-templator = require('config-templator');
config = config-templator.get(config, 'uri'); // localhost:3000
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Loic Mahieu. Licensed under the MIT license.

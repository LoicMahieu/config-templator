# config-templator [![Build Status](https://secure.travis-ci.org/loicmahieu/config-templator.png?branch=master)](http://travis-ci.org/loicmahieu/config-templator)

Dynamic remplacment in object, inspired by GruntJS config

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

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Loic Mahieu. Licensed under the MIT license.

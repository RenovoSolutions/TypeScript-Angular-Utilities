require('core-js/es6');
require('core-js/es7/reflect');

// require all modules ending in ".tests.ts" from source and all subdirectories

var testsContext = require.context('./source', true, /\.tests\.js$/);
testsContext.keys().forEach(testsContext);

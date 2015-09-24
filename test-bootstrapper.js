// require all modules ending in ".tests.ts" from source and all subdirectories

var testsContext = require.context('./source', true, /\.tests\.ts$/);
testsContext.keys().forEach(testsContext);

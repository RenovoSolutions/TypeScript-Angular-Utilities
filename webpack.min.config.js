var webpack = require('gulp-utilities').webpack;
var library = require('./webpack.library.json');

module.exports = webpack.libraryMin(library);

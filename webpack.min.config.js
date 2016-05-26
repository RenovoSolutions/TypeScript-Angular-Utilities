var webpack = require('@renovolive/gulp-utilities').webpack;
var library = require('./webpack.library.json');

var webpackConfig = webpack.libraryMin(library);

module.exports = webpackConfig;

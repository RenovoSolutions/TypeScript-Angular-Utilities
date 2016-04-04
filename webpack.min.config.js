var webpack = require('gulp-utilities').webpack;
var library = require('./webpack.library.json');

var webpackJsonLoader = require('./webpack.json-loader');

var webpackConfig = webpack.libraryMin(library);
webpackJsonLoader(webpackConfig);

module.exports = webpackConfig;

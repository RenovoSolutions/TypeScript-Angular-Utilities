var webpack = require('gulp-utilities').webpack;
var library = require('./webpack.library.json');

var webpackJsonLoader = require('./webpack.json-loader');

var webpackConfig = webpack.library(library);
webpackJsonLoader(webpackConfig);

webpackConfig.devtool = 'inline-source-map';

module.exports = webpackConfig;

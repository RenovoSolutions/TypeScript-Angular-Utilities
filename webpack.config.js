var webpack = require('gulp-utilities').webpack;
var library = require('./webpack.library.json');

var webpackConfig = webpack.library(library);
webpackConfig.devtool = 'inline-source-map';

module.exports = webpackConfig;

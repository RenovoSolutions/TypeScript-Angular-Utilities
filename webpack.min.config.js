var configuration = require('./webpack.config.js');
var webpack = require('webpack');

configuration.output.filename = 'utilities.min.js';

var minify = new webpack.optimize.UglifyJsPlugin({ minimize: true });

configuration.plugins = configuration.plugins || [];
configuration.plugins.push(minify);

module.exports = configuration;

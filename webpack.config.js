var path = require('path');

module.exports = {
	entry: './source/utilities',
	output: {
		path: path.resolve('output'),
		filename: 'utilities.js',
		library: 'rl-utilities',
		libraryTarget: 'this',
	},
	module: {
		loaders: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
			},
		],
	},
	externals: {
		'angular': 'angular',
		'moment': 'moment',
		'lodash': '_',
		'angular-mocks': 'angular',
	},
	resolve: {
		extensions: ['', '.webpack.js','.web.js', '.js', '.ts'],
	},
};
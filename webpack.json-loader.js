module.exports = function (webpackConfig) {
	webpackConfig.module = webpackConfig.module || {};
	webpackConfig.module.loaders = webpackConfig.module.loaders || [];

	webpackConfig.module.loaders.push({
		test: /\.json$/,
		loader: 'json-loader',
	});
};

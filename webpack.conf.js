/**
 * Optional plugins:
 * - WebpackOnBuildPlugin - serve older webpack build while building the new one.
 */

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var _path = require('path');

var env = process.env.NODE_ENV || 'development',
		app = process.env.APP || process.env.app || 'react',
		DEV = env === 'development';

function path(p) {
	return _path.join(__dirname, p);
}
var config = {
	cache: DEV,
	watch: DEV,
	debug: false,
	devtool: 'eval',
	entry: [
			'./src/' + app + '/app.js'
		],
	output: {
		path: path('build-' + app),
		filename: 'script.js',
		publicPath: '/build-' + app
	},
	sassLoader: {
		outputStyle: DEV ? undefined : 'compressed'
	},
	module: {
		loaders: [
			{test: /\.js?$/, loader: 'babel!eslint', include: [path('src')]},
			{test: /\.json$/, loader: 'json', include: [path('src')]},
			{test: /\.html$/, loader: 'html', include: [path('src')]},
			{test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass'), include: path('src/css')}
		]
	},
	resolve: {
		root: path('./src')
	},
	plugins: [
		new ExtractTextPlugin('styles.css'),
		new webpack.DefinePlugin({
			'process.env': {NODE_ENV: JSON.stringify(env)}
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
			app
		})
	]
};

if(!DEV) config.plugins = config.plugins.concat([
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		},
		output: {comments: false}
	}),
	new webpack.BannerPlugin('Roman Malieiev <aromaleev@gmail.com>')
]);

module.exports = config;

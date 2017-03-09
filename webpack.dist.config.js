var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");//分离CSS,JS文件
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var pxtorem = require('postcss-pxtorem');
var nodePath = __dirname + "/node_modules";

module.exports = {
	entry: {
		bundle: path.resolve(__dirname, "app/app"),
		vendor: [
			"react",
			"react-dom",
			"react-router",
			"redux",
			"react-redux",
			"react-tap-event-plugin",
			"lib-flexible",
			"whatwg-fetch"
		]
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: '[name]-[hash].min.js'
	},
	module: {
		noParse: path.resolve(nodePath, 'react/dist/react.min'),
		loaders: [{
			test: /\.js[x]?$/,
			exclude: path.resolve(__dirname, "node_modules"),
			loader: 'babel',
			query: {
				plugins: [
					["external-helpers"],
					["babel-plugin-transform-runtime", {
						polyfill: false
					}],
					["transform-runtime", {
						polyfill: false
					}],
					["import", {
						"style": true,
						"libraryName": "antd-mobile"
					}]
				],
				presets: ['es2015', 'react', 'stage-0']
			}
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style','css!postcss')
		}, {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract('style','css!postcss!less')
		}, {
			test: /\.(jpg|png|gif)$/,
			loader: 'url-loader?limit=8129'
		}]
	},
	resolve: {
		modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
		extensions: ['', '.web.js', '.jsx', '.js', 'less', 'css', '.json']
	},
	postcss: [
		autoprefixer({
			browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
		}),
		pxtorem({
			rootValue: 75,
			propWhiteList: []
		})
	],
	plugins: [
		new HtmlWebpackPlugin({
			title: "月嫂派-月嫂端2.0",
			filename:'index.html',
			template: __dirname+"/template.html",
			minify: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor"
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.DedupePlugin(),
		new ExtractTextPlugin("style-[hash].css"),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify("production")
			}
		})
				
	]
};
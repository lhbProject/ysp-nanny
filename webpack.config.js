var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var pxtorem = require('postcss-pxtorem');
var nodePath = __dirname + "/node_modules";

module.exports = {
	devtool: 'source-map',
	entry: {
		bundle: ['webpack/hot/dev-server', path.resolve(__dirname, "app/app")]
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: '[name].js'
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
			loader: 'style!css!postcss'
		}, {
			test: /\.less$/,
			loader: 'style!css!postcss!less'
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
	devServer: {
		contentBase: './', //默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
		colors: true, //在cmd终端中输出彩色日志
		historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
		inline: true, //设置为true，当源文件改变时会自动刷新页面
		port: 3000, //设置默认监听端口，如果省略，默认为"8080"
		process: true, //显示合并代码进度
		hot: true,
		host: '0.0.0.0'
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
};
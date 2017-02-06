const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry: {
		main: './index.jsx',
		vendor: [
			'react',
			'react-dom',
			'react-router',
			'jquery'
		]
	},

	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000
	},

	context: path.resolve(__dirname, 'app'),
	
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
	},

	devtool: "cheap-eval-source-map",
	target: "web",

	module: {
		rules: [{
			test: /\.(js|jsx)?$/,
			include: [
				path.resolve(__dirname, "app")
			],

			use: "babel-loader"
		}, {
			test: /\.html?$/,

			use: [{
				loader: "file-loader",
				query: {
					name: '[name].[ext]'
				}
			}]
		}, {
			test: /\.styl?$/,
			use: [
				'style-loader',
				'css-loader',
				'stylus-loader'
			],
		}, {
			test: /\.css?$/,
			use: [
				'style-loader',
				'css-loader'
			]
		}, {
			test: /\.(png|jpg|jpeg|svg|ico)$/,
			use: [
				'file-loader?name=assets/[name].[ext]'
			]
		}],
	},
	
	resolve: {
		modules: [
			"node_modules",
			path.resolve(__dirname, "app")
		],

		extensions: ['.js', '.json', '.jsx', '.styl', '.css'],
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		})
	]
}
const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry: {
		main: './app/index.jsx'
	},
	
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
	},

	devtool: "source-map",
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
				'css-loader',
				'stylus-loader'
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
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
	]
}
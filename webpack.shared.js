const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer-stylus')

module.exports = {
	rules: [
		{
			enforce: 'pre',
			test: /\.js$/,
			loader: "source-map-loader"
		},
		{
			enforce: 'pre',
			test: /\.ts$/, 
			use: "source-map-loader"
		},
		{
			test: /\.ts?$/,
			exclude: /node_modules/,
			use: [ { loader: 'babel-loader' }, { loader: 'ts-loader' } ]
		},
		{
			test: /\.styl$/,
			use: ExtractTextPlugin.extract({
				fallback:"style-loader",
				use: [
					'css-loader',
					{
						loader: 'stylus-loader',
						options: {
							use: [ autoprefixer() ],
						}
					}
				]
			})
		}
	],
	extensions: [".ts", ".ts", ".js", ".styl", ".css"],
	plugins() {
		return [
			new webpack.optimize.CommonsChunkPlugin({ 
	      name: 'vendor',
	      minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1
	    }),
	    new webpack.optimize.CommonsChunkPlugin({ 
	      name: 'manifest'
	    }),
			new HtmlWebpackPlugin({
	      // Required
	      inject: false,
	      template: require('html-webpack-template'),
	      // Optional
	      appMountId: "app",
	      meta: [ 
						{"name":"author","content":"@synergized"}, ],
	      mobile: true,
	      title: "hello"
	    }),
			new webpack.SourceMapDevToolPlugin({
	      filename: "[file].map",
	      exclude: ["vendor.js"]
	    }),
	    new ExtractTextPlugin('styles.css'),
			new webpack.ProvidePlugin({
	      regeneratorRuntime: 'regenerator-runtime'
	    }),
		]
	}
}

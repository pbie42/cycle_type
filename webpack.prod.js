const webpack = require('webpack')
const Shared = require('./webpack.shared')

module.exports = {
  entry: {
    main: './src/app.ts'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: __dirname + "/dist"
  },
  module: {
    rules: Shared.rules
  },
  resolve: {
    extensions: Shared.extensions
  },
  plugins: [ 
    ...Shared.plugins(),
		new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
		new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
};

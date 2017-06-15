const Shared = require('./webpack.shared')

module.exports = {
  entry: {
    main: './src/app.ts'
  },
  output: {
    filename: '[name].js',
    path: __dirname + "/public"
  },
  module: {
    rules: Shared.rules
  },
  resolve: {
    extensions: Shared.extensions
  },
  plugins: Shared.plugins()
}

const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  // devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: '../dist/',
    hot: true,
    // clientLogLevel: 'warning',
    // stats: 'verbose'
  },
});
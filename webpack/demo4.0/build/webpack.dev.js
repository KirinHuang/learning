const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

webpack.logLevel = 'NONE'
module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  // devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: '../dist/',
    hot: true,
    clientLogLevel: 'warning',
    stats: 'verbose'
  },
});
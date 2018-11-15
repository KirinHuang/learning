const merge = require('webpack-merge')
const common = require('./webpack.common')
const WorkboxPlugin = require('workbox-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:6].js',
    chunkFilename: '[name].[contenthash:6].js',
    publicPath: './',
  },
  devtool: 'eval',
  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});
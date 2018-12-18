const merge = require('webpack-merge')
const common = require('./webpack.common')
const { resolve } = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:5].js',
    chunkFilename: 'js/[name].[contenthash:5].js',
    publicPath: '/',
  },
  // devtool: 'eval',
  plugins: [
    new CleanWebpackPlugin([resolve(__dirname, '../dist')], {
      root: process.cwd()
    }),
    // new webpack.optimize.AggressiveSplittingPlugin(),
    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true
    // })
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
})
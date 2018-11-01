const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:6].js',
    chunkFilename: '[name].[contenthash:6].js',
  },
});
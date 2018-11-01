const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, '../dist'),
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new CleanWebpackPlugin([resolve(__dirname, '../dist')], {
        root: process.cwd()
    }),
    new HtmlWebpackPlugin({
        title: 'Output Management'
    }),
  ],
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  'css-loader'
              ]
          },
          {
              test: /\.(png|gif|svg|jpg)$/,
              use: [
                  'file-loader'
              ]
          },
          {
              test: /\.(woff|woff2)$/,
              use: [
                  'file-loader'
              ]
          }
      ]
  }
};
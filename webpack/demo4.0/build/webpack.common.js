const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].dev.js',
    path: resolve(__dirname, '../dist'),
    chunkFilename: '[name].dev.js',
    publicPath: '/',
    pathinfo: false
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        lodash: {
          test: /.*lodash.*/,
          name: 'lodash',
          chunks: 'all'
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
      }
    }
  },
  externals: {
    // lodash: {
    //   commonjs: 'lodash',
    //   commonjs2: 'lodash',
    //   amd: 'lodash',
    //   root: '_'
    // }
  },
  plugins: [
    new CleanWebpackPlugin([resolve(__dirname, '../dist')], {
        root: process.cwd()
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].dev.css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].dev.css' : '[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
        title: 'Output Management'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          // 'sass-loader',
        ],
      },
      {
        test: /\.(png|gif|svg|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:5].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:5].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    symlinks: false,
    extensions: ['.tsx', '.ts', '.js']
  }
};
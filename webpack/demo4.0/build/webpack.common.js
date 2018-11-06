const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

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
    runtimeChunk: {
      name: "manifest",
    },
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
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  },
  recordsPath: join(__dirname, "../dist/records.json"),
  plugins: [
    new CleanWebpackPlugin([resolve(__dirname, '../dist')], {
        root: process.cwd()
    }),
    new HtmlWebpackPlugin({
        title: 'Output Management'
    }),
    // new webpack.optimize.AggressiveSplittingPlugin()
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
  },
  resolve: {
    symlinks: false,
    extensions: ['.tsx', '.ts', '.js']
  }
};
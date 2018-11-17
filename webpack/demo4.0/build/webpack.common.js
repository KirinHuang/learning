const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const devMode = process.env.NODE_ENV !== 'production'

let cssLoader = [
  MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    query: {
      importLoaders: 1
    }
  },
  'postcss-loader',
]

if (devMode) {
  cssLoader.splice(0, 0, 'css-hot-loader')
}

const webpackConfig = {
  entry: {
    app: './src/main.js',
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
        styles: {
          name: 'styles',
          test: /\.s?css$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
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
  recordsPath: join(__dirname, "../dist/records.json"),
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].dev.css' : '[name].[contenthash:5].css',
      chunkFilename: devMode ? '[id].dev.css' : '[id].[contenthash:5].css',
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.tpl'
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
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: cssLoader,
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
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': '../src/'
    }
  }
}

module.exports = webpackConfig
const { resolve, join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const config = require('./config')
const devMode = process.env.NODE_ENV !== 'production'

let cssLoader = [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
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
  context: resolve(__dirname, '../'),
  entry: {
    app: ['./src/main.js'],
  },
  output: {
    filename: 'js/[name].dev.js',
    path: resolve(__dirname, '../dist'),
    chunkFilename: 'js/[name].dev.js',
    publicPath: '/',
    pathinfo: false
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
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
  recordsPath: join(__dirname, '../dist/records.json'),
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? 'css/[name].dev.css' : 'css/[name].[contenthash:5].css',
      chunkFilename: devMode ? 'css/[id].dev.css' : 'css/[id].[contenthash:5].css',
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.tpl',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({ // for http-server spa
      template: './src/index.tpl',
      filename: '404.html'
    }),
    // new webpack.DllPlugin({
    //   path: join(__dirname, '../public/manifest/', '[name]-manifest.json'),
    //   name: '[name]-[hash:5]',
    //   context: __dirname,
    // }),
    // 这个是用来稳定hash值，防止出现webpack的hash出现莫名的变化
    // new webpack.HashedModuleIdsPlugin(),
    // new webpack.NamedChunksPlugin(),
    // ...config.DllReferencePlugins,
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   // scope: 'xyz',
    //   manifest: require(join(__dirname, 'manifest.json')),
    //   // name: './my-dll.js',
    //   // sourceType: 'commonsjs2',
    //   // content: { ... }
    // })
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
        use: [
          'babel-loader'
        ]
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
              outputPath: 'img/'
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
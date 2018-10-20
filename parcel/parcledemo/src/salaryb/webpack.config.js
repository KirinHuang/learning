var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var proxyIP = '119.28.55.129'
// proxyIP = '122.200.133.186'
var port = 8081

module.exports = {
  entry: './import.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' })
  ],
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: [
          {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          // 'less': 'vue-style-loader!css-loader!less-loader?indentedSyntax'
          }
        ]
        // other vue-loader options go here
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
      loader: 'url-loader?limit=50000&name=[path][name].[ext]'
    }, {
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    }, {
      test: /\.less$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "less-loader" // compiles Less to CSS
      }]
    }]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: port,
    disableHostCheck: true,
    proxy: {
      '/hz': {
        target: 'http://' + proxyIP,
        pathRewrite: {
          '^/column': '/column'
        },
        changeOrigin: true
      },
      '/sso': {
        target: 'http://' + proxyIP,
        pathRewrite: {
          '^/column': '/column'
        },
        changeOrigin: true
      },
      '/pay': {
        target: 'http://' + proxyIP,
        pathRewrite: {
          '^/column': '/column'
        },
        changeOrigin: true
      },
      '/3AOS': {
        target: 'http://' + proxyIP,
        changeOrigin: true
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.output.publicPath = './dist/'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      // beautify: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

module.exports.plugins = (module.exports.plugins || []).concat([
  //HtmlWebpackPlugin，模板生成相关的配置，每个对于一个页面的配置，有几个写几个
  new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
    // favicon: './favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
    filename: '../salary.html', //生成的html存放路径，相对于path
    template: './salary.tpl', //html模板路径
    inject: 'body', //js插入的位置，true/'head'/'body'/false
    hash: true, //为静态资源生成hash值
    // chunks: ['vendors', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
    minify: { //压缩HTML文件
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: false //删除空白符与换行符
    }
  }),
])

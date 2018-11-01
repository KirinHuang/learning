const express = require('express')
const { resolve } = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const config = require('./webpack.dev')
const compiler = webpack(config)
const app = express()

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

console.log(`static path ${resolve(__dirname + './../public')}`)
app.use(express.static(resolve(__dirname + './../public')))

app.listen(8080, () => {
  console.log('webpack server is running!')
})
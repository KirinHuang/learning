const { resolve } = require('path')
const webpack = require('webpack')

const DllReferencePlugins = [
  new webpack.DllReferencePlugin({
    manifest: resolve(__dirname, '../public/manifest/app-manifest.json')
  }),

  new webpack.DllReferencePlugin({
    manifest: resolve(__dirname, '../public/manifest/manifest-manifest.json')
  }),

  new webpack.DllReferencePlugin({
    manifest: resolve(__dirname, '../public/manifest/styles-manifest.json')
  }),
]

module.exports = {
  DllReferencePlugins
}
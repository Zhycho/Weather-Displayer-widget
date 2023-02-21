const webpack = require('webpack')
const path = require("path");
const { defineConfig } = require('@vue/cli-service');

const assetsDir = "assets";

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, 'dist')
    : '/',
  assetsDir: assetsDir,
  configureWebpack: {
    output: {
      filename: assetsDir + "/[name].js",
      chunkFilename: assetsDir + "/[name].js"
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  }
})

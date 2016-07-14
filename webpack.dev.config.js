var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
// 路径的配置，path是Node的模块
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
console.log(SRC_PATH);
module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    filename: 'idd.js'
  },
  devServer: {
    inline: true,
    contentBase: './dist',
    port: 8100
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  // plugins: [new HtmlWebpackPlugin({
  //   title: 'Hello World app',
  //   filename: './index.html',
  //   prod: false,
  //   AMUICDN: '.',
  //   template: './docs/template.html',
  //   inject: 'body'
  //     // hash:true
  // })]
};

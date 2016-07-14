var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    filename: 'picker.min.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
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
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      filename: '../docs/doc.html',
      prod: false,
      AMUICDN: '.',
      template: './docs/template.html',
      inject: 'body'
        // hash:true
    })
  ]
};

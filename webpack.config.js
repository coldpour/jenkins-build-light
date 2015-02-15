var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var CODE = __dirname+'/src';
var React = require('react');

module.exports = {
  entry: './src/app.js',

  output: {
    path: __dirname,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.js$/, loader: 'jsx-loader?harmony' },
      { test: /\.css$/, loader: 'style!css'}
    ]
  }
};

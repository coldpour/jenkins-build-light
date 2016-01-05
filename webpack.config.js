module.exports = {
  entry: './src/app.js',

  output: {
    path: __dirname+'/public/javascripts',
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

var path = require('path');

module.exports = {
  entry: './browser/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude:/node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.html$/, loader: 'html' },
      { test: /\.css$/, loader: 'style!css'}
    ]
  },
  devtool: '#inline-source-map'
}

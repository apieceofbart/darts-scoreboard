const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 1337
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}

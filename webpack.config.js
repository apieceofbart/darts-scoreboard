const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const lessLoader = ExtractTextPlugin.extract('css-loader?sourceMap!less-loader?sourceMap');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 1337,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: lessLoader
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true })
  ]
}

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  // devtool: 'cheap-module-source-map',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.web.js',
    publicPath: '/',
  },
  // optimization: {
  //   splitChunks: {
  //     minSize: 0,
  //     chunks: 'all',
  //   },
  // },
  plugins: [
    new webpack.NamedChunksPlugin(),
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production',
    }),
    new CompressionPlugin({
      test: /\.js/,
    }),
  ],
});

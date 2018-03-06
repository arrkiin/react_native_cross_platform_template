const path = require('path');
const webpack = require('webpack');

const appDirectory = path.resolve(__dirname, '../');

const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    //   path.resolve(appDirectory, 'node_modules/react-native-uncompiled')
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // Babel configuration (or use .babelrc)
      // This aliases 'react-native' to 'react-native-web' and includes only
      // the modules needed by the app.
      plugins: ['react-native-web', 'dynamic-import-webpack'],
      // The 'react-native' preset is recommended to match React Native's packager
      presets: ['react-native'],
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

module.exports = {
  entry: path.resolve(appDirectory, 'index.web.js'),
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist'),
  },
  module: {
    rules: [babelLoaderConfiguration, imageLoaderConfiguration],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      __DEV__: process.env.NODE_ENV === 'production' || true,
    }),
  ],
  resolve: {
    extensions: ['.web.js', '.js'],
    alias: {
      'react-native-svg': 'react-native-svg-web',
    },
  },
};

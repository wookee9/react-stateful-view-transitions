const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': [
      'babel-polyfill',
      path.join(__dirname, './src/app.jsx'),
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs'),
  },
  resolve: {
    extensions: ['.js','.jsx']
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'Spike - Stateful View Transitions',
      template: './src/index.ejs',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader',
      },
      {
        test: /\.exec\.js$/,
        use: [ 'script-loader' ]
      },
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, "src"),
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ],
  },
};

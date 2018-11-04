const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const rootDir = path.resolve(__dirname, '..', '..');

module.exports = {
  context: path.resolve(rootDir, 'front'),
  mode: 'development',
  target: 'web',
  entry: ['babel-polyfill', './index.jsx'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: [/\.jsx$/, /\.js$/],
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'template.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        mode: JSON.stringify('development'),
      },
    }),
  ],
  resolve: {
    extensions: ['.jsx', '.js', 'html'],
    modules: ['./', 'node_modules'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    proxy: {
      '^/api/*': {
        target: 'http://localhost:3000/api/',
        secure: false,
      },
    },
  },
};

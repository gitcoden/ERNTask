const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const rootDir = path.resolve(__dirname, '..', '..');

module.exports = {
  context: path.resolve(rootDir, 'front'),
  mode: 'development',
  entry: ['./index.jsx'],
  output: {
    filename: 'react.js',
    path: path.join(rootDir, 'production', 'front'),
  },
  target: 'web',
  devtool: 'source-map',
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
  optimization: {
    namedModules: true,
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: ['../', 'node_modules'],
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

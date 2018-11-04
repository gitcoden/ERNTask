const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const rootDir = path.resolve(__dirname, '..', '..');

module.exports = {
  context: path.resolve(rootDir, 'front'),
  target: 'web',
  mode: 'production',
  entry: ['./index.jsx'],
  output: {
    filename: 'react.js',
    path: path.resolve(rootDir, 'production', 'front'),
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/, /\.js$/],
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: ['../', 'node_modules'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        extractComments: true,
      }),
      new OptimizeCss({}),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),
  ],
};

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const rootDir = path.join(__dirname, '..', '..');

const webpackConfig = {
  context: path.resolve(rootDir, 'back'),
  devtool: 'source-map',
  entry: ['./back.js'],
  mode: 'production',
  target: 'node',
  output: {
    path: path.join(rootDir, 'production', 'back'),
    filename: './back.js',
  },
  externals: [
    nodeExternals({
      whitelist: [/^lodash/, /^@material-ui/],
    }),
  ],
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: ['../', './node_modules'],
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              emitFile: false,
            },
          },
        ],
      },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.(ejs)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                return file;
              },
              emitFile: false,
            },
          },
        ],
      },
    ],
  },
  node: {
    __dirname: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),
  ],
};

module.exports = webpackConfig;

const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

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
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: ['./back', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
};

module.exports = webpackConfig;
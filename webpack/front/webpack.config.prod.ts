import * as path from 'path';
import * as optimizeCss from 'optimize-css-assets-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as webpack from 'webpack';

const rootDir = path.resolve(__dirname, '..', '..', '..');

export const config: webpack.Configuration = {
  mode: 'production',
  entry: ['./front/index.tsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(rootDir, 'production', 'front')
  },
  module: {
    rules: [
      {
        test: [/\.tsx$/, /\.ts$/],
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'html'],
    modules: [path.resolve(rootDir, 'front'), 'node_modules']
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        extractComments: true
      }),
      new optimizeCss({})
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, 'front', 'index.html'),
      minify: {
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css'
    })
  ]
};

import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as webpack from 'webpack';

const rootDir = path.resolve(__dirname, '..', '..', '..');

export const config: webpack.Configuration = {
  mode: 'development',
  entry: ['./front/index.tsx'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'eval-source-map',
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
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, 'front', 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'html'],
    modules: [path.resolve(rootDir, 'front'), 'node_modules']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};

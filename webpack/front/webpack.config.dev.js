"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const rootDir = path.resolve(__dirname, '..', '..', '..');
exports.config = {
    mode: 'development',
    entry: ['babel-polyfill', './front/index.jsx'],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: [/\.jsx$/, /\.js$/],
                use: ['babel-loader'],
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
        extensions: ['.jsx', '.js', 'html'],
        modules: [path.resolve(rootDir, 'front'), 'node_modules']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};

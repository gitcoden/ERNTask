"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCss = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const rootDir = path.resolve(__dirname, '..', '..', '..');
exports.config = {
    mode: 'production',
    entry: ['babel-polyfill', './front/index.jsx'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(rootDir, 'production', 'front')
    },
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
    resolve: {
        extensions: ['.jsx', '.js', 'html'],
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

let path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, './js/index.js'),
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'main.js'
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({template: './index.pug', filename: 'index.html'}),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
              { from: "./img", to: "img" },
            ],
          }),
    ],
    module: {
		rules: [
            {
              test: /\.scss$/i,
              use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
              test: /\.pug$/,
              loader: 'pug-loader',
              options: {
              pretty: true
              }
          }
          ],
	},
    optimization: {
        minimizer: [
          `...`,
          new CssMinimizerPlugin(),
        ],
      },
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "assert": require.resolve("assert/"),
            "url": require.resolve("url/"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "buffer": require.resolve("buffer/"),
            "fs": false
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'output'),
        },
        compress: true,
        port: 9000,
        hot: true,
    },
}
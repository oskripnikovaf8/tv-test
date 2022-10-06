const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const path = require('path');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    favicon: 'assets/images/favicon.ico',
    inject: true,
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
  }),
  new FileManagerPlugin({
    events: {
        onEnd: {
            copy: [
                {
                    source: path.resolve(__dirname, '../../assets/images/'),
                    destination: path.resolve(__dirname, '../../dist/assets/images/'),
                },
            ],
        },
    },
}),
];

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
    mode: 'development',
    entry: ['./src/main.tsx'],
    module: {
        rules: require('./webpack.rules'),
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    plugins: require('./webpack.plugins'),
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
        alias: {
            // React Hot Loader Patchyy
            'react-dom': '@hot-loader/react-dom',
            // Custom Aliases
            ...require('./webpack.aliases'),
        },
    },
    stats: 'errors-warnings',
    devtool: 'source-map',
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: true,
        contentBase: './',
        hot: true,
        disableHostCheck: true,
        writeToDisk: true,
        clientLogLevel: 'silent',
    },
    performance: {
        hints: false,
    },
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
        minimize: true,
      },
};

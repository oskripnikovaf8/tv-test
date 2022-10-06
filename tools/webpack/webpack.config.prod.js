const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  mode: 'production',
  entry: ['./src/main.tsx'],
  module: {
    rules: require('./webpack.rules'),
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    clean: true,
  },
  plugins: [...require('./webpack.plugins')],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      // Custom Aliases
      ...require('./webpack.aliases'),
    },
  },
  stats: 'errors-warnings',
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    minimize: true,
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
};

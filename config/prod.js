const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function(env) {
  return webpackMerge(commonConfig(), {

    output: {
      filename: '[name].[chunkhash].js', // finally should be '[name].[chunkhash].js for Long-Term Caching
    },

    plugins: [

      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        },
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
      }),

      // new webpack.optimize.UglifyJsPlugin(),

      new CleanWebpackPlugin(['dist'], {
        root: __dirname,
        verbose: true,
        dry: false,
      }),

    ],
  });
};
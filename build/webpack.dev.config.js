'use strict'
const path = require('path')
const config = require('../config')
const webpack = require('webpack')
const vueLoaderConfig = require('./vue-loader.conf.js')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const devWebpackConfig = {
    context: path.resolve(__dirname, '../'),
    entry: {
      app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dest'),
        filename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
      }
    },
    module: {
      rules: [
        {
            test: /\.vue$/,
            use:[{
                loader: 'vue-loader',
                options: vueLoaderConfig
            }]
        },
        { 
          test: /\.js$/,
          use:[{
            loader:'babel-loader',
            
          }],
          include: [resolve('src')]
        },
        {
            test: /\.scss$/,
            use: ['css-loader', 'sass-loader']
          },
          {
            test: /\.css$/,
            use:['style-loader','css-loader']
        }
      ],
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': require('../config/dev.env')
        }),
        new vueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'index.html',
          inject: true
        }),
      ],
    devServer: {
        clientLogLevel: 'warning',
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: 'localhost',
        port: '8083',
    },
    node: {
      // prevent webpack from injecting useless setImmediate polyfill because Vue
      // source contains it (although only uses it if it's native).
      setImmediate: false,
      // prevent webpack from injecting mocks to Node native modules
      // that does not make sense for the client
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    }
  }
  module.exports = devWebpackConfig
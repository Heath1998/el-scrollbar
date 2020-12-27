'use strict'
const path = require('path')
const vueLoaderConfig = require('./vue-loader.conf.js')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
      app: './src/plugin/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'vElementScrollbar.js',
        library: 'vElementScrollbar', // library指定的就是你使用require时的模块名，这里便是require("vueAjaxUpload")
        libraryTarget: 'umd', //libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
        // umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
      }
    },
    mode:"development",
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
            test: /\.css$/,
            use:['style-loader','css-loader']
        }
      ]
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
  
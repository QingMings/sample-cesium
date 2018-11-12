// 去console插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// gzip压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 拷贝文件插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const debug = process.env.NODE_ENV !== 'production'
let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'
module.exports = {
  baseUrl: '',
  // 生产环境下 sourceMap
  productionSourceMap: false,
  devServer: {
    port: 9999
  },
  configureWebpack: {
    output: {
      sourcePrefix: ' '
    },
    amd: {
      toUrlUndefined: true
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
        'cesium': path.resolve(__dirname, cesiumSource)
      }
    },
    plugins: [
      // new UglifyJsPlugin({
      //     uglifyOptions: {
      //         compress: {
      //             warnings: false,
      //             drop_debugger: true,
      //             drop_console: true,
      //         },
      //     },
      //     sourceMap: false,
      //     parallel: true,
      // }),
      // new CompressionWebpackPlugin({
      //     asset: '[path].gz[query]',
      //     algorithm: 'gzip',
      //     test: new RegExp(
      //         '\\.(' +
      //         ['js', 'css'].join('|') +
      //         ')$',
      //     ),
      //     threshold: 10240,
      //     minRatio: 0.8,
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   chunks: ['layer'],
      //   // 开发环境下需要使用热更新替换，而此时common用chunkhash会出错，可以直接不用hash
      //   filename: '[name].js' + (isProduction ? '?[chunkhash:8]' : ''),
      //   name: 'common'
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'cesium',
      //   minChunks: module => module.context && module.context.indexOf('cesium') !== -1
      // }),
      new CopyWebpackPlugin([{from: path.join(cesiumSource, cesiumWorkers), to: 'static/Workers'}]),
      new CopyWebpackPlugin([{from: path.join(cesiumSource, 'Assets'), to: 'static/Assets'}]),
      new CopyWebpackPlugin([{from: path.join(cesiumSource, 'Widgets'), to: 'static/Widgets'}]),
      new CopyWebpackPlugin([{from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'static/ThirdParty/Workers'}]),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('./static')
      })
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'Cesium',
            test: /[\\/]node_modules[\\/]cesium/,
            chunks: 'all'
          }
        }
      }
    },
    module: {
      // noParse: [/videojs-contrib-hls/],
      // rules: [
      //   {
      //     test: require.resolve('jquery'),
      //     use: [{
      //       loader: 'expose-loader',
      //       options: 'jQuery'
      //     }, {
      //       loader: 'expose-loader',
      //       options: '$'
      //     }]
      //   }],
      unknownContextCritical: /^.\/.*$/,
      unknownContextCritical: false

    }
  },
  css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {}
  }
}

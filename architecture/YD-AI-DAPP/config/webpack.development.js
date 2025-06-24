const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, join } = require('path');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const port = 3003;
module.exports = {
  devServer: {
    historyApiFallback: true, // 单页的spa应用 使用起来
    static: {
      directory: join(__dirname, '../dist'),
    },
    hot: true,
    port,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: './public/favicon.ico',
      template: resolve(__dirname, '../src/index-dev.html'),
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:' + port],
        notes: ['构建信息请及时关注窗口右上角']
      },
      // 报错弹框插件2选1
      // new WebpackBuildNotifierPlugin({
      //   title: 'Solv Development Notification',
      //   logo,
      //   suppressSuccess: true
      // })
      onErrors: function (serverity, errors) {
        if (serverity !== 'error') {
          return;
        }
        const error = errors[0];
        console.log(error);
        notifier.notify({
          title: 'Webpack Build Error',
          message: serverity + ': ' + error.name,
          subtitle: error.file || '',
          icon: join(__dirname, 'icon.png'),
        });
      },
      clearConsole: true,
    })
  ]
}
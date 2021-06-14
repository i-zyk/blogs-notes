const path = require('path');
module.exports = {
    // 设置打包模式
    // development:开发模式{默认不压缩} production: 生产模式{默认压缩}「默认」
    mode: 'development',
    // 打包入口文件目录
    entry: './src/main.js',
    // 打包后的输出目录
    output: {
        // 输出文件名
        filename: 'bundle.js',
        // 输出的路径「必须是一个绝对路径」
        path: path.resolve(__dirname, 'dist')
    }
};
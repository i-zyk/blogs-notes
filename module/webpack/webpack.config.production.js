/* 生产环境的打包规则 */
const path = require('path');
module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        // [hash]: 每一次打包的时候，根据文件内容不同，生成不同的HASH值，
        //      保证文件代码更新，生成的文件名字是不同的
        filename: 'bundle.[hash].min.js',
        path: path.resolve(__dirname, 'dist')
    }
};
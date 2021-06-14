/* 
    requirejs.js 是AMD模块化思想：按需导入、依赖管理 
        AMD 思想的一个问题：所有依赖的模块都需要前置导入
*/
require.config({
    // 全局配置：导入模块的根地址
    baseUrl: './lib',
});

require(['A', 'B'],function(A, B) {
    let total = A.sum(1, 2, 3, 4, 5);
    console.log(total);

    let ave = B.average(1, 2, 3, 4, 5);
    console.log(ave);
});
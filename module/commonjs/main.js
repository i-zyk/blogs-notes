// let A = require('./A'); 我们可以直接把导入的A对象结构赋值 
let {
    sum
} = require('./A');
console.log(sum(1, 2, 3, 4, 5));

let average = require('./B');
console.log(average(1, 2, 3, 4, 5));

/*  CommonJS 模块导出规范
    + 导出 module.exports = {};
        let obj = require('./模块地址);
        let {sum} = require('./模块地址') 
    + module.exports = xxx; 
        let xxx = require('./模块地址');
    
    导入自己写的模块需要加"./" 这样的地址，
    如果是导入NODE内置模块（或者安装的第三方模块），直接写模块名字即可

    特点：只能在NODE环境下运行，不能再浏览器端运行
        淘宝的“玉伯”之前开发过一款插件 sea.js, 旨在让浏览器端也能运行CommonJS模块规范，
        他把这种模块思想称之为“CMD”
    
    现在sea.js 已经不用了，但是我们使用webpack打包的时候，webpack支持CommonJS规范，
    所以我直接可以使用CommonJS规范写代码，最后webpack帮我们编译为浏览器可以识别的代码！！
*/


/* // import只能放在最开始的位置
import A from './A.js';
import average from './B.js';
console.log(A.sum(12, 23, 34, 45));
console.log(average(12, 23, 34, 45)); */

// 支持export导出多个的“导入方式”
/* import * as C from './C.js';
console.log(C); */
/* import {
    n,
    m,
    fn
} from './C.js';
console.log(n, m, fn); */

/* // 支持 export default 函数
import fn from './D.js';
console.log(fn); */

// 支持 export default 对象
/* import E from './E.js';
//浏览器端，此种方案，不能直接import的时候给E结构赋值，但是获取到E之后，可以单独自己解构
// const {sum,fn}=E;
console.log(E); */

// webpack环境下，即支持CommonJS规范，也支持ES6Module规范，而且可以支持两者混着用「用ES6Module导出的，可以基于CommonJS导入...」
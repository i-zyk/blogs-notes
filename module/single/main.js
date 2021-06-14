let total = A.sum(1, 3, 3 ,4);
console.log(total);

let ave = B.average(1, 2, 3, 4, 5);
console.log(ave);

// main.js 依赖 A.js、B.js
// B.js 依赖 A.js
// =====
// 单例设计模式作为早期的模块化编程方案， 是可以实现模块区分、避免全局变量污染；
//   但是随着前端发展，我们要拆分的模块越来越多，而且模块和模块之间的依赖也越来越复杂
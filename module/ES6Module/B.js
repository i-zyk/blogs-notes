import A from './A.js';
//浏览器端使用ES6Module，“.js”不能忽略「webpack中使用可以忽略后缀名」
const average = function average(...params) {
    let total = A.sum(...params);
    return (total / params.length).toFixed(2);
};
export default average;
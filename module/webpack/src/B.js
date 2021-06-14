import A from './A.js'; // 浏览器端使用ES6Module，".js" 不能忽略「webpack中可以忽略后缀名」
const average = function average(...arg) {
    let total = A.sum(...arg);
    return (total / arg.length).toFixed(2);
};

export default average;
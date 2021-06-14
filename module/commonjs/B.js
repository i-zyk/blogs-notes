// CommonJS模块导入规范
let A = require('./A.js'); // ./A.js
const average = function average(...arg) {
    let total = A.sum(...arg);
    return (total / arg.length).toFixed(2);
};

module.exports = average;

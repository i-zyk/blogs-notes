/* 
    EC(G)
      VO(G)/GO
        a -> 12
    变量提升: var a;
    代码执行：
*/

console.log(a); // undefined
var a = 12; 
console.log(b); // Uncaught ReferenceError: Cannot access 'b' before initialization
let b = 12;
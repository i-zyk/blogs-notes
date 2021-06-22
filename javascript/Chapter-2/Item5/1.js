/* 
    EC(G) 全局执行上下文
        VO(G) 全局变量对象「基于let/const声明的变量」
            y -> 13
        window->GO全局对象「基于var/function声明的变量」
            x:12
*/
debugger;
var x = 12;
let y = 13;
z = 14; // window.z=14 直接设置在GO中，相当于省略了"window."
console.log(x); //12 首先看VO(G)是否存在，如果不存在再去看GO中是否存在，如果都没有则报错：x is not defined
console.log(window.x); //12 直接到GO中找这个属性，如果不存在这个属性，值是undefined
console.log(y); // 13
console.log(window.y); // undefined;
console.log(window.z); // 14
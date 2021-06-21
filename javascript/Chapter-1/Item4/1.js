let obj = {
    name: 'zzzz'
};
console.log(Number(obj)); // => NaN
// obj[Symbol.toPrimitive -> undefined]
// obj.valueOf() -> {name: ...}
// obj.toString() -> '[object Object]'
// Number('[object Object]') -> NaN

let arr1 = [10],
    arr2 = [10, 20];

console.log(Number(arr1));
console.log(Number[arr2]);
/* 
    都没有Symbol.toPrimitive
    —> valueOf获取的都不是原始值
    -> toString的结果: "10" / "10,20"
    -> 10 / NaN
 */

// let time = new Date();
// console.log(Number(time)); 
/* 
    time[Symbol.toPrimitive] 的值是个函数，说明日期对象有这个属性
    —> 接下来把这个属性执行 time[Symbol.toPrimitive]() 执行方法传递值hint：'number'/'string'/'default'
    因为是Number，所以 time[Symbol.toPrimitive]('number') 传的是number类型
    -> 1624017645835
*/

let time = new Date();
// 日期对象不允许我们重写Symbol.toPrimitive
// 原型上也不能重写 Date.prototype[Symbol.toPrimitive] = function(){}
time[Symbol.toPrimitive] = function (hint) {
    console.log(hint);
    return '@aaaa'
}

console.log(Number(time)); 

let obj1 = {
    name: 'cccc',
    [Symbol.toPrimitive](hint) {
        console.log(hint)// -> "number"
        return 10
    }
};
console.log(Number(obj1)); // hint->"number" Number(10) 10
console.log(String(obj1)); // hint->"string" String(10) "10"
console.log(obj1.toString()); 
/* 
"[object Object]" Object.prototype.toString.call(obj1) 
    这不是把它转换为字符串「而是检测数据类型」，所以不走Symbol.toPrimitive 这一套逻辑 
*/

let arr = [10];
arr[Symbol.toPrimitive] = function(hint) {
    console.log(hint);
    return 0;
};
console.log(arr.toString()); // "10"; 直接调用原型的方法，不会走Symbol.toPrimitive这套逻辑，因为人家方法内部自己处理了
console.log(arr + ""); // 需要把arr隐式转换为字符串「需要走Symbol.toPrimitive这套逻辑 hint->'default'」再进行字符串拼接
// 因为浏览器不知道 + 是字符串拼接 还是 数学运算 所以传default

/* 
  当我们把对像隐式转换为数字或者字符串的时候「使用的方法：Number/String」，会有一套自己的处理逻辑
    @1 检测Symbol.toPrimitive, 如果有这个方法，浏览器会把方法执行，传递hint「根据场景不一样，
        浏览器默认传递的值也不同 'number'/'string'/'default'」,
        内部返回啥，则处理的结果就是啥；如果没有这个方法，则进行下一步；
    @2 基于valueOf获取原始值，如果获取的不是原始值，则进行下一步：
    @3 基于toString获取字符串
    @4 如果需要转的是数字，则再次把字符串转为数字即可
    但是如果是直接 对象.toString, 相当于直接调用第三个步骤「直接调用所属类原型上的toString方法」，
        此时直接获取字符串，不会走这四步逻辑
*/
// parsetInt的处理规则和 Number的完全不一致
console.log(parseInt('10')); //10
console.log(Number('10')); //10

console.log(parseInt('10px')); //10
console.log(Number('10px')); //NaN


console.log(parseInt(null)); //parsetInt('null') -> NaN
console.log(Number(null)); //0
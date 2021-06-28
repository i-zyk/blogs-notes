/* 
THIS: 函数执行的主体(谁执行的函数)
  + 事件绑定
  + 函数执行「普通函数执行、成员访问、匿名函数、回调函数……」
  + 构造函数
  + 箭头函数「生成器函数generator」
  + 基于call/apply/bind强制修改this指向
  + ……
*/
console.log(this);
// -> 全局上下文中的this：window
// -> 块级上下文中没有自己的this，所用的this都是继承上级上下文中的this「箭头函数也是」

/* 
  事件绑定
    DOM0: xxx.onxxx=function(){}
    DOM2:
        xxx.addEventListener('xxx',function(){})
        xxx.attachEvent('onxxx',function(){})
  给当前元素的某个事件行为绑定方法「此时是创建方法，方法没执行」，当事件行为触发，
  浏览器会把绑定的函数执行，此时函数中的this->当前元素对象本身
  特殊：基于attachEvent实现事件绑定，方法执行，方法中的this是window
*/
/* document.body.addEventListener('click', function() {
    console.log(this); // -> body
}) */

/* 
    函数执行
        正常的普通函数执行：看函数执行前面是否有"点"，有，"点"前面是谁this就是谁，
            没有this是window「严格模式下是undefined」
        匿名函数：
          + 函数表达式,等同于普通函数或者事件绑定等机制
          + 自执行函数: this是window「严格模式下是undefined」
          + 回调函数: 一般都是window/「严格模式下是undefined」,但是如果另外函数执行中，对回调函数的执行做了特殊处理，以自己处理的为主
        括号表达式：小括号中包含"多项"，这样也只取最后一项，但是this受到影响
*/
"use strict"; // 开启JS严格模式「默认是非严格模式」
function fn() {
    console.log(this)
}
let obj = {
    name: 'zzz',
    fn
    // fn: fn
};
fn(); // this->window/undefined(严格模式下)
obj.fn(); //this->obj

(obj.fn())(); //this->obj
(10, obj.fn())(); // this->window/undefined(严格模式下)


// 自执行函数
(function (x) {
    console.log(this);
})(10);

// 回调函数：把一个函数A作为实参，传递给另外一个执行的函数B「在B函数执行中，可以把A执行」
function fn(callback) {
    // callback -> 匿名函数
    callback()
}
fn(function () {
    console.log(this);
})

let arr = [10, 20, 30];
/* arr.forEach(function (item, index) {
    console.log(this); // -> window
}) */
arr.forEach(function (item, index) {
    console.log(this); // -> forEach第二个参数「对象」forEach内部做处理了
}, {
    xxx: 'xxx'
});

//------
var x = 3,
    obj = {x: 5};
obj.fn = (function () {
    this.x *= ++x;
    return function (y) {
        this.x *= (++x)+y;
        console.log(x);
    }
})();
var fn = obj.fn;
obj.fn(6);
fn(4);
console.log(obj.x, x);


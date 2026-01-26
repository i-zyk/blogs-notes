// let p = new Promise([executor]);  
//   + p是它的实例
//   + [executor]是一个函数，传递的不是函数会报错

// p.__proto__===Promise.prototype
//   私有属性：[[PromiseState]]:"pending"  [[PromiseResult]]:undefined
//      promise实例的状态有三种：pending准备状态  fulfilled/resolved成功状态  rejected失败状态
//      最初的状态是pending，后期基于某些操作可以把状态改变为fulfilled或者rejected(但是一但状态变为成功或者失败，则再也不能修改其状态了)，而[[PromiseResult]]存放的是成功的结果或者失败的原因！
// 疑惑一：状态改完有毛用？
// 1）基于then可以存放两个函数  p.then(onfulfilled,onrejected)
// 2）当我们把状态修改为fulfilled成功态，则会把onfulfilled这个函数执行，相反，我们把状态修改为rejected失败态，则会把onrejected这个函数执行...
// 3) 并且会把[[PromiseResult]]作为实参值，传递给onfulfilled/onrejected
// 疑惑二：咋改状态啊？
// 1) new Promise的时候，会立即把传递进来的executor函数执行，并且会给executor传递两个实参进来，我们会用两个形参变量接收resolve/reject，并且值是两个函数
// 2）当我们执行resolve，promise实例状态变为fulfilled成功，传递的值就是成功的结果，赋值给[[PromiseResult]]；同理，只要把reject执行，promise实例状态变为rejected失败，传递的值就是失败的原因！
// 3) 如果executor函数执行报错了，则实例的状态也是rejected失败，失败原因是就是错误信息！！
//   公有属性：then / catch / finally / Symbol.toStringTag="Promise"
/* let p = new Promise(function executor(resolve, reject) {
    reject('NO');
});
p.then(function onfulfilled(result) {
    console.log('成功', result);
}, function onrejected(reason) {
    console.log('失败', reason);
}); */

/* new Promise((resolve, reject) => {
    // 在这里一般管理异步编程的代码
    $.ajax({
        url: './api/data100.json',
        success(result) {
            resolve(result);
        },
        error(reason) {
            reject(reason);
        }
    });
}).then(result => {
    console.log('请求成功', result);
}, reason => {
    console.log('请求失败', reason);
}); */


/* new Promise((resolve, reject) => {
    setTimeout(() => {
        let ran = Math.random();
        if (ran > 0.5) resolve('OK');
        reject('NO');
    }, 1000);
}).then(result => {
    console.log('请求成功', result);
}, reason => {
    console.log('请求失败', reason);
}); */


/* // 我们可以基于 “promise实例.then” 存放多个onfulfilled/onrejected方法，状态变为成功或者失败，存放的每一个对应的方法都会被执行
let p1 = new Promise((resolve, reject) => {
    resolve(100);
});
p1.then(result => {
    console.log(`成功：${result}`);
}, reason => {
    console.log(`失败：${reason}`);
});
p1.then(result => {
    console.log(`成功：${result}`);
}, reason => {
    console.log(`失败：${reason}`);
}); */


/* // new Promise产生的实例，他的状态是成功还是失败，取决于“resolve/reject执行 或者 executor执行是否报错”
let p1 = new Promise((resolve, reject) => {
    reject(0);
});
// 每一次执行THEN方法，不仅存放了onfulfilled/onrejected方法，而且还会返回一个“全新的promise实例”
//   新实例p2的状态和值由谁来决定呢？
//     + 不论onfulfilled/onrejected这两个方法执行的是哪一个，我们只看执行是否报错；如果报错，则p2的状态是失败态rejected，值是报错原因；如果不报错，则p2的状态是成功态fulfilled，值是函数的返回值！
let p2 = p1.then(result => {
    console.log(`成功：${result}`);
    return 1000;
}, reason => {
    console.log(`失败：${reason}`); //失败 0
    return -1000;
});
let p3 = p2.then(result => {
    console.log(`成功：${result}`); //成功 -1000
    throw new Error('xxx');
}, reason => {
    console.log(`失败：${reason}`);
});
p3.then(result => {
    console.log(`成功：${result}`);
}, reason => {
    console.log(`失败：${reason}`); //失败 Error:xxx
}); */


/* let p1 = new Promise((resolve, reject) => {
    resolve(100);
});
// 特殊情况：我们之前说，不论onfulfilled/onrejected执行，只要不报错，则新实例p2的状态就是成功，只要报错就是失败...但是这里有一个特殊的情况：“执行不报错，但是返回值是一个新的promise实例，这样返回值的这个promise实例是成功还是失败，直接决定了p2是成功还是失败”
let p2 = p1.then(result => {
    console.log(`成功：${result}`); //成功 100
    return new Promise((resolve, reject) => reject(-1000));
}, reason => {
    console.log(`失败：${reason}`);
    return -1000;
});
p2.then(result => {
    console.log(`成功：${result}`);
}, reason => {
    console.log(`失败：${reason}`); //失败：-1000
}); */


/* let p1 = new Promise((resolve, reject) => {
    reject(0);
});
let p2 = p1.then(result => {
    console.log(`成功：${result}`);
    return new Promise((resolve, reject) => reject(-1000));
}, reason => {
    console.log(`失败：${reason}`); //失败：0
    return new Promise((resolve, reject) => resolve(1000));
});
p2.then(result => {
    console.log(`成功：${result}`); //成功：1000
}, reason => {
    console.log(`失败：${reason}`);
}); */

// Promise中的then链机制:因为每一次.then都会返回一个新的promise实例，所以我们就可以持续.then下去了
// 而且因为实例诞生的方式不同，所以状态判断标准也不同
//   第一类：new Promise 出来的实例
//      + 执行的是 resolve 还是 reject 决定状态
//      + executor函数执行是否报错
//   第二类：.then 返回的新实例
//      不论执行的是onfulfilled还是onrejected
//      + 首先看返回值是否为新的promise实例，如果不是，则只看执行是否报错「不报错状态就是成功，值就是函数返回值；报错则状态就是失败，值就是失败原因」
//      + 如果返回的是新的promise实例，则新的promise实例的状态和值，直接决定了.then返回的实例的状态和值
//   第三类：
//      + Promise.resolve(100) 返回一个状态是成功，值是100的新promise实例
//      + Promise.reject(0)  返回一个状态是失败，值是0的新promise实例
// 只要实例的状态和值我们分析好，则 .then(onfulfilled,onrejected) 存放的方法，哪一个执行我们就知道了
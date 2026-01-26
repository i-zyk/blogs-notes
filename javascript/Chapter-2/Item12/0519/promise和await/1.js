/*
 * Promise：承诺者模式，它是ES6新增的一个内置类，基于Promise可以有效管理“异步编程”，避免回调地狱
 *   + new Promise()
 */

// 需求：三个ajax请求，我们要实现ajax的“串行”「上一个请求成功，才可以发送下一个请求；同理还有一个ajax“并行”：多个请求可以同时发送(偶尔需要等所有并行请求成功后，统一做啥事情)」

/* 
// 基于ajax的同步操作，实现出来ajax的串行；但是真实项目中是不允许使用ajax同步处理的（因为请求没成功之前，所有的其它事情都被阻碍了，也无法实现ajax的并行）；
let data = null;
$.ajax({
    url: './api/data1.json',
    async: false,
    success(result) {
        data = result;
    }
});
console.log(`第一个请求成功，结果是：${data}`);
$.ajax({
    url: './api/data2.json',
    async: false,
    success(result) {
        data = result;
    }
});
console.log(`第二个请求成功，结果是：${data}`); 
*/


/* // JQ中的ajax管理，是基于回调函数的方式管理的「请求成功后，会触发success回调函数执行，result就是本次请求获取的结果」；如果我们想实现ajax串行，需要把下一个请求发送，放在上一个请求成功的回调函数中处理，如果有多个串行的请求，就会一层层的嵌套... => “回调地狱”「代码看起乱、不方便管理」
// 痛点：传统方案中，基于回调函数的方式管理异步编程的代码，总是要在异步任务可执行的时候，在他的回调函数中处理一些事情，这样很容易就产生回调地狱！！
$.ajax({
    url: './api/data1.json',
    success(result) {
        console.log(`第一个请求成功，结果是：${result}`);
        $.ajax({
            url: './api/data2.json',
            success(result) {
                console.log(`第二个请求成功，结果是：${result}`);
                $.ajax({
                    url: './api/data3.json',
                    success(result) {
                        console.log(`第三个请求成功，结果是：${result}`);
                    }
                });
            }
        });
    }
}); */



const query1 = function () {
    return new Promise(resolve => {
        $.ajax({
            url: './api/data1.json',
            success(result) {
                resolve(result);
            }
        });
    });
};

const query2 = function () {
    return new Promise(resolve => {
        $.ajax({
            url: './api/data2.json',
            success(result) {
                resolve(result);
            }
        });
    });
};

const query3 = function () {
    return new Promise(resolve => {
        $.ajax({
            url: './api/data3.json',
            success(result) {
                resolve(result);
            }
        });
    });
};

// 解决方案：Promise
/* query1().then(result => {
    console.log(`第一个请求成功，结果是：${result}`);
    return query2();
}).then(result => {
    console.log(`第二个请求成功，结果是：${result}`);
    return query3();
}).then(result => {
    console.log(`第三个请求成功，结果是：${result}`);
}); */

/* // 解决方案：async/await 「Promise+generator的语法糖」
(async function () {
    let result = await query1();
    console.log(`第一个请求成功，结果是：${result}`);

    result = await query2();
    console.log(`第二个请求成功，结果是：${result}`);

    result = await query3();
    console.log(`第三个请求成功，结果是：${result}`);
})(); */
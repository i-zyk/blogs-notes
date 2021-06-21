let arr = [27.2, 0, '0013', '14px', 123];
arr = arr.map(parseInt);
console.log(arr);
/* arr = arr.map((item, index) => {
    // 迭代数组每一项，每迭代一次，就会把回调函数触发执行一次
    // + item: 当前迭代这一项
    // + index：当前这一项的索引
    // 函数返回啥，相当于把当前项替代换成为啥「原始数组不变，返回一个新数组」
    retrun `@${item}`;
});

// parseInt([val],[radix]): 
    方法支持第二个参数「进制radix」，从左侧[val]字符串中，查找出符合[radix]进制的字符，
    把找到的字符看做[radix]进制，最后转换为10进制
    + [radix]不设置或者设置为0，默认值是10「特殊：如果左侧字符串是以"0x"开始的，默认值是16」 
    + 取值范围：2～36，如果不在这个范围内「排除0」，则结果一定是NaN
    + 其他进制转换为10进制：按权展开求和
特殊：parseInt(0023)
    + 浏览器遇到以 0 开始的数字，则认为是八进制的值
    + 浏览器中我们看到的数值都是十进制的，所以默认就存在：把八进制转换为十进制的操作
    parseInt(0023) -> parseInt(19)
        2*8^1 + 3*8^0
    把 parseInt(0023) -> parseInt(19) 是浏览器规则，转换后在走parseInt的规则
     -> 19


'1001' 以二进制身份转换为十进制
    1*2^3 + 0*2^2 + 0*2^1 + 1*2^0 -> 8 + 0 + 0 + 1 -> 9
'0.12' 以三进制身份转换为十进制
    0*3^0 + 1*3^-1 + 2*3^-2 -> 0 + 0.3333…… + 0.1111…… -> 0.5555……

parseInt(27.2, 0)
    parseInt('27.2', 10) 
    -> '27' 符合十进制的
    -> 27
parseInt(0, 1)
    -> NaN
parseInt('0013', 2)
    -> '001' 符合二进制的
    -> 0*2^2 + 0*2^1 + 1*2^0
    -> 1
parseInt('14px', 3)
    -> '1'  符合三进制的
    ->  1*3^0
    -> 1
parseInt(123, 4)
    -> parseInt('123', 4)
    -> '123' 符合四进制的
    -> 1*4^2 + 2*4^1 + 3*4^0
    -> 16 + 8 + 3
    -> 27
新数组；[27,NaN,1,1,27]
*/
parseInt('12px', 10);
// 12 把其看做10进制，转换为10进制
parseInt(0023);
// parseInt(0023) -> parseInt(19);;
// -> 19

//=============
/* 
String([val]) 或者 [val].toString()
    第一种办法：需要经历 Symbol.toPrimitive -> valueOf -> toString 这样的处理步骤
    第二种办法：直接调用[val]所属类原型上的toString，直接转换为字符串了「普通对象」
"+" 在JS中，除了数学运算，还可能代表的字符串拼接
    @1 "+" 有两边「左右两边都有值」，一边是字符串，则一定是字符串拼接
    @2 "+" 有两边，其中一边是对象，这样可能会出现字符串拼接
        例如： 1 + {} => '1[object Object]'
            检测对象的Symbol.toPrimitive方法，如果有，则执行这个方法，传递hint -> 'default'
            没有上述的办法，再基于valueOf获取原始值
            如果获取的不是原始值，则基于toString 把其转换为字符串
            此时"+"遇到了字符串，则变为字符串拼接"1[object Object]"

        1 + new Date()
            -> 1 + new Date()[Symbol.toPrimitive('default')]
            -> "1Sun Jun 06 2021 ……"

        1 + new Number(10)
            -> 1 + new Number(10).valueOf() 基于valueOf获取的是原始值
            => 11

        特殊： {}+1, 而且前提是没有使用小括号把他们包起来，或者在对象的左边，
                没有其它的操作{例如：声明变量接收值等}，此时浏览器是把当前操作
                分解成为两部分"{} 代码块" 和 "+1 数组运算"，两部分之间没有关系，所以结果是1
              ({} + 1) -> [object Object]1
              let res = {}+1 -> [object Object]1
              console.log({}+1) -> [object Object]1,也被小括号包起来了
    
    @3 "+" 有一边「出现在左边」，它实现的是把一个值转换为数字「隐式」
        知识点: i++ 和 ++i 的区别？

*/

let obj = {
    [Symbol.toPrimitive](hint) {
        console.log(hint); // -> 'default'
        return 0;
    }
};
console.log(1 + obj); // 1

let result = 100 + true + 21.2 + null + undefined + "Tencent" + [] + null + 9 + false;
// 100 + true -> 101
// 102+21.1 -> 122.2
// 122.2+null -> 122.2
// 122.2+undefined -> NaN
// NaN+"Tencent" -> "NaNTencent"
// 接下来都是字符串拼接 "NaNTencentnull9false"
console.log(result); // "NaNTencentnull9false"

// =======
console.log([] == false);
// 都要转换为数字
//  Number([]) -> 0
//  false -> 0
// => true
console.log(![] == false);
// ![] 取反 -> !true -> false
// false == false
// => true

// 练习；
isNaN(parseInt(new Date())) + Number([1]) + typeof undefined;
// parseInt(new Date()) -> NaN
// isNaN(NaN) -> true
// Number([1]) -> 1
// typeof undefined -> 'undefined'
// true + 1 + 'undefined' => '2undefined'

!(!"Number(undefined)"); // => true

parseFloat("1.6px") + parseInt("1.2px") + typeof parseInt(null);
// parseInt('null') -> NaN
// typeof NaN -> 'number'
// 1.6 + 1 + 'number' => '2.6number'

Boolean(Number("")) + !isNaN(Number(null)) + Boolean("parseInt([])") + typeof !(null);
// false + true + true + 'boolean' => '2boolean'

isNaN(Number(!!Number(parseInt("0.8"))));
// parseInt('0.8') -> 0
// !!0 -> false
// Number(false) -> 0
// isNaN(0) -> false

!typeof parseFloat("0");
// parseFloat('0') -> 0
// typeof 0 -> 'number'
// !'number' -> false

Number(""); // => 0
16 + {}; //=> '16[object Object]'
{} + 16; //=> 16

// i++ 和 ++i 都是自身基础累加1
// i=1 5+i++ -> 5+1(6) i++(i=2) 先拿原始值运算，运算完成后再自身累加1
// i=1 5+(++i) -> ++i(2) 5+2(7) 先累加1，拿累加后的结果再进行运算
// i++ 和 i+=1/i=i+1
//  i='1' i++ -> 2 "++" 一定是数学运算
//  i='1' i=i+1 -> '11' i+=1和i+1可能出现字符串拼接  
var n = 6;
console.log((n++) + n-- + 5 + --n + --n); // => 27
// 6 「n=7」+ 7「n=6」+ 5 + 5「5」+ 4「4」 
console.log(n); // => 4

// -----------------------
var str = 'abc123';
var num = parseInt(str); // NaN
if (num == NaN) {
    alert(NaN);
} else if (num == 123) {
    alert(123);
} else if (typeof num == 'number') {
    // 成立: 'number' => alert是需要把内容转换为字符串然后在输出的
    alert('number');
} else {
    alert('str');
}

//------------

// isNaN(NaN) -> true
// true == "" -> 1 == 0 不成立
// => 'bbb'
if (isNaN(NaN) == "") {
    console.log("aaa")
} else {
    console.log("bbb")
}
// -------------
// 线索：
// @1 "==" 比较「想出”类型转换“ -> 对象转数字 -> Symbol.toPrmimitive/valueOf/toString...」
// @2 声明a变量是在全局上下文中，而且是基于var处理的「想出"GO window" -> 我们使用的a是window的属性 -> Object.defineProperty」
var i = 0;
Object.defineProperty(window, 'a', {
    // 获取window中a属性的值，会触发getter函数
    get() {
        return ++i;
    }
})

/* 
var a = {
    i: 0,
    [Symbol.toPrimitive]() {
        // this -> a
        return ++this.i 
    }
};
// a[Symbol.toPrimitive]('number');
if(a == 1 && a == 2 && a == 3) {
    console.log('OK');
} 
*/

/* 
var a = [1, 2, 3];
a.toString = a.shift;
if(a == 1 && a == 2 && a == 3) {
    console.log('OK');
} 
*/

// ------
/* 
计算机处理浮点（小数）的精准度问题（前端 & 后端） 
    + 所有数据类型值，在计算机底层都是以“二进制”进行存储的「IEEE-754规范、64位的二进制值」
例如：在浏览器中，我们看到的数字都是十进制，但是存储到计算机底层就是二进制，所以存在把十进制转换位二进制
    + 整数：除以2取余数「商为0结束」
    + 小数：乘以2，取整数部分，剩余的继续乘以2……直到整数为1，没有小数部分了
        「特殊：很多浮点数转换为二进制，结果都是无限循环的，但是计算机底层最多只能存储64为，超出的部分截掉 => "我们存储到计算机底层的浮点数，对应的二进制值，本身可能就是不准确的"」
浏览中的十进制值，是有长度限制的「一般是16～17位」，所以 0.1+0.2 计算机底层处理完的结果可能是 0.300000000000000040000000004000000……
浏览器在截取的时候，把超出的部分截掉，裁掉之后，如果后面都是0则省略掉，但凡有一位不是0则不能省略，所以 0.1+0.2 = 0.30000000000000004
    0.6
    0.6 * 2 = 1.2	1
    0.2 * 2 = 0.4	0
    0.4 * 2 = 0.8	0
    0.8 * 2 = 1.6	1
    0.6 * 2 = 1.2	1
    ……

    0.1+0.2
*/
const coefficient = function (num) {
    num = num + '';
    let [, char = ''] = num.split('.'),
        len = char.length;
    return Math.pow(10, len + 1);
};
const plus = function (n, m) {
    n = +n;
    m = +m;
    if (isNaN(n) || isNaN(m)) return NaN;
    let coeff = Math.max(coefficient(n), coefficient(m));
    return (n * coeff + m * coeff) / coeff
};
console.log(plus(4218.15, 0.1));
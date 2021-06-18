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
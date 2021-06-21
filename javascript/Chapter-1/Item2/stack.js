class Stack {
    container = [];
    enter(element) {
        this.container.unshift(element);
    }
    leave() {
        return this.container.shift();
    }
    size() {
        return this.container.length;
    }
    value() {
        return this.container.slice(0);
    }
}
let sk = new Stack;
// 把十进制转换为二进制
// + 整数 除以2取余数
Number.prototype.decimal2binary = function decimal2binary() {
    // console.log(+this); +this 是把对象实例变为数字
    let decimal =+ this,
        sk = new Stack;
    if(decimal === 0) return '0';
    while (decimal > 0) {
        sk.enter(decimal % 2);
        decimal = Math.floor(decimal / 2);
    }
    return sk.value().join('');
};
consoe.log((10).toString(2)); // "1010"
consoe.log((10).decimal2binary(2)); // "1010"
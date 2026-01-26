/*
 * 浏览器拿到页面代码后，会开始渲染和解析代码，最后在页面中渲染出图形和效果
 *   渲染HTML/CSS代码：遵循W3C规则，GUI渲染线程去处理
 *   渲染JS代码：遵循ECMAScript(ECMA-262)规则，JS引擎线程去处理
 *   在渲染代码过程中，如果遇到 link/img/script[src=xxx]/audio/video 等，浏览器需要开辟“HTTP线程”，从服务器端获取到对应的资源文件(文件中的代码)
 * 
 * 1. GUI在渲染HTML代码的时候，会分析出节点之间的嵌套关系，从而绘制出DOM树（DOM-Tree）
 *    渲染过程中遇到<link>，则开辟新的HTTP线程去获取资源文件，GUI不受影响，继续向下渲染 “异步”
 *    如果遇到的是<style>，则无需获取资源，代码本身就有，此时GUI直接去渲染即可 “同步”
 *    如果遇到的是@import，也会开辟新的HTTP线程去获取资源，但是此时会阻碍GUI的渲染，只有当样式资源获取后，GUI才会渲染新拿到的样式代码 “同步”
 *    ==>优化技巧：如果CSS样式“代码比较少”，我们直接使用<style>内嵌式即可(尤其是移动端，我们经常这么干)；但是如果代码比较多，还用内嵌式则会导致HTML请求速度都很慢，此时我们使用外链式；除特殊必要，不建议使用导入式；
 * 
 * 2. 在渲染解析中，我们可能会开辟多个HTTP线程获取资源文件，同时GUI继续渲染，直到DOM-Tree生成；在DOM树生成后，等待所有的CSS资源都获取到，然后按照最开始编写的顺序，GUI再去依次渲染，最后生成CSSOM-Tree(CSS样式树)
 * 
 * 3. 等待CSSOM-Tree也生成后，会和DOM-Tree合并在一起，生成一个Render-Tree(渲染树)：渲染树包含了页面绘制的具体规则(节点的位置、大小、样式等等信息都有了) => Layout(布局排列)，而我们所谓的重排(回流)就是重新生成Render-Tree的过程
 * 
 * 4. 根据Render-Tree进行分层以及构建详细的绘制方案
 *    绘制图形的时候，是按照层，一层层的绘制的
 * 
 * 5. 交给显卡(GPU)开始进行绘制  => Painting(绘制/绘画)，而我们所谓的重绘就是重新绘制
 * 
 * 如果引发一次重排(回流)，必然会进行重绘；但是单纯只重绘，不一定会重排(回流)；
 *   DOM的重排(回流)：在第一次页面绘制完成后，如果我们修改了页面中节点的“位置、大小、结构等样式”，浏览器需要重新计算绘制规则(也就是重新生成Render-Tree)，这个过程就是重排；重新生成Render-Tree后需要重新的绘制；
 *   DOM的重绘：如果节点的位置、大小、结构等样式没有改变，只是改变了一些基础的样式（例如：改变了文字或者背景的颜色），此时无需重新生成Render-Tree，只需要重新Painting绘制即可！
 * 
 * 为啥说操作DOM消耗性能？
 *   因为操作DOM就有极大的几率会引发DOM的重排/重绘，所以性能消耗比较大！再所以，当代项目开发，我们已经告别了直接操作DOM的时代(JQ也就没用了)，而是基于MVVM(vue)和MVC(react)等数据驱动模式进行开发「我们只需要操作数据，框架会根据数据帮助我们渲染视图和操作DOM，而框架内部操作DOM的时候，做了大量的优化处理，来提高性能！」
 * 
 * 性能优化：减少DOM的重排(回流)
 *   + 放弃直接操作DOM，使用vue/react/angular等数据驱动框架
 *   + 读写分离：把修改样式和获取样式的操作分离开，避免渲染队列的刷新
 *   + 元素的批量操作：文档碎片、模板字符串拼接等
 *   + 开起GPU加速：
 *     + 修改“transform”样式，不会引发重排「不会对整体重排，只会对当前这一层重新渲染」：因为修改transform样式，浏览器会自己新起一个文档流(层)去渲染，并不会对原始层中的元素位置、大小等信息产生改变
 *     + 我们平时修改样式，尽可能修改那些脱离文档流的{例如:position定位,我们修改top/left等信息}：虽然也会引发重排，但是渲染和计算的时候，也只是对当前这一层进行处理，其他层如果没有发生改变，则无需重新渲染
 *   + 基于JS实现动画{定时器触发、requestAnimationFrame}，我们一般会牺牲平滑度换取速度(性能)；但是我们现在实现动画，基本上都是基于CSS3中的transition、animation实现，他们的性能会更好！！
 */


/* 
// 引发一次重排
let str = ``;
for (let i = 1; i <= 5; i++) {
    str += `<span>
        ${i}
    </span>`;
}
document.body.innerHTML += str; */

/* let frag = document.createDocumentFragment(); //创建一个文档碎片（临时的容器用来存储DOM对象的）
for (let i = 1; i <= 5; i++) {
    // 每一轮循环都把创建好的SPAN放在文档碎片中
    let span = document.createElement('span');
    span.innerHTML = i;
    frag.appendChild(span);
}
// 最后把文档碎片中的所有DOM元素，统一插入到页面中：引发“一次”重排
document.body.appendChild(frag); */

/* // 此操作会引发“五次”重排:每一轮循环都会改变DOM结构
for (let i = 1; i <= 5; i++) {
    let span = document.createElement('span');
    span.innerHTML = i;
    document.body.appendChild(span);
} */

//==============================
// let box = document.querySelector('#box');
// 集中改变样式
// box.style.cssText = 'width:100px;height:100px;background:pink;';
// box.className = 'box';

/* // 当前触发三次重排
box.style.width = '100px';
box.style.height = '100px';
console.log(box.offsetWidth); //刷新渲染队列
box.style.position = 'absolute';
box.style.left = '100px';
console.log(box.offsetLeft); //刷新渲染队列
box.style.top = '100px';
box.style.background = 'pink'; */

/* // 在新版的浏览器中，以下操作触发“一次”DOM重排：当代浏览器有“渲染队列机制”
box.style.width = '100px';
box.style.height = '100px';
box.style.position = 'absolute';
box.style.left = '100px';
box.style.top = '100px';
box.style.background = 'pink'; */


/*
 * 在GUI渲染DOM-Tree的时候，如果遇到 img/audio/video 等，和link一样，都是单独分配HTTP线程去获取资源，不会阻碍GUI的渲染！但是真实项目中，第一次加载页面的时候，图片和音视频我们都会做懒加载：
 *   + 同源下允许最多的HTTP并发数是5~7个(也就是浏览器针对这个源，同时只能分配5~7个HTTP线程)，所以如果把这些线程用来做图片资源的获取，其他资源都要排后获取了...而且图片本身获取就慢、如果获取的还多，很有可能导致HTTP传输通道的堵塞，让其余正在获取的资源也获取慢了...
 *   + 虽然图片资源的获取是不会阻碍GUI线程渲染，但是资源回来后，在最后页面渲染的时候，肯定是需要把图片渲染的，这样也延长了页面渲染的时间...
 *   
 * 
 * 如果遇到的是 <script src='xxx.js'> ，它和上面的都不一样，它是“同步的”，它会阻碍GUI的渲染「遇到script，首先分配一个HTTP去获取JS资源，但是同时GUI也暂停渲染了；当资源获取回来后，JS引擎线程开始去渲染JS，此时GUI还等待着呢！」
 *   + 所以一般都把JS放在页面的底部「首先不想让其阻碍GUI渲染DOM树；而且放在顶部，此时还没有DOM树呢，我们无法获取DOM元素(只有不需要操作DOM的JS代码，放在顶部没啥问题)；」
 * 
 * 1.虽然放在底部，不影响DOM树渲染，但是会影响CSSOM树和RENDER树的渲染「毕竟它是阻碍GUI处理的」
 *   解决方案：把其改为异步操作，不要让他阻碍GUI渲染
 *   <script src="xxx.js" async>
 *      获取资源的时候GUI继续渲染，但是资源一但获取到，立即阻断GUI，继续渲染JS「哪个资源先回来，就把哪个资源先执行，没有考虑JS的依赖顺序」
 *   <script src="xxx.js" defer>
 *      获取资源的时候不会阻碍GUI渲染，但是需要等待GUI渲染完(RENDER-TREE完成)，再去按照JS导入的先后顺序，依次渲染JS代码「defer是考虑到了JS依赖顺序的」
 * 优化内容：真实项目中，我们最好都把JS放在底部导入(并且多个JS合并为一个)，最好再设置上defer/async
 * 
 * 2.把JS放在顶部导入，并且还能获取到DOM元素对象？
 *    + 外链资源设置defer/async
 *    + 设置事件监听：load OR DOMContentLoaded
 */

let box = document.querySelector('#box1');
console.log(box); //=>null

// CRP性能优化：关键节点路径，分析底层处理机制，针对每个环节进行相关的优化
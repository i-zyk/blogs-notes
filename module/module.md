## 模块化

### webpack「v5.0」

[https://webpack.docschina.org/](https://webpack.docschina.org/)

webpack是一个现代JavaScript应用程序的静态模块打包工具。当webpack处理应用程序时，它会在内部构建一个依赖图(dependency [/dɪˈpendənsi/] graph [/ɡræf/])，此依赖图会映射项目所需的每个模块，并生成一个或多个bundle包！webpack本身是基于node.js开发的！
* grunt
* gulp
* fis
* webpack
* vite
* ……

    

**为啥要使用webpack**
* 代码转换：TypeScript编译成JavaScript、LESS/SCSS编译成CSS、ES6/7编译为ES5、虚拟DOM编译为真实的DOM等等…
* 文件优化：压缩JS、CSS、HTML代码，压缩合并图片，图片BASE64等
* 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码等
* 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件
* 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器
* 代码校验：Eslint 代码规范校验和检测、单元测试等
* 自动发布：自动构建出线上发布代码并传输给发布系统
* ……

### 1. CommonJS规范 & ES6Module规范

**模块化编程进化历史**
* 单例设计模式
* AMD「require.js」
* CommonJS
* CMD「sea.js」
* ES6Module

**单例设计模式**

[单例设计模式使用示例](./single/)

单例设计模式作为早期的模块化编程方案， 是可以实现模块区分、避免全局变量污染；
但是随着前端发展，我们要拆分的模块越来越多，而且模块和模块之间的依赖也越来越复杂, 单例模式在处理模块依赖的时候，容易把人搞“疯”！！

**AMD「require.js」**

[AMD规范使用示例](./amd/) --- [https://requirejs.org](https://requirejs.org)

requirejs.js 是AMD模块化思想：按需导入、依赖管理, AMD 思想的一个问题：所有依赖的模块都需要前置导入



**CommonJS模块化规范**

[CommonJS模块化使用示例](./commonjs/)

CommonJS 模块化导出规范

* 导出 module.exports = {}; 
  + let obj = require('./模块地址'); 
  + let {sum} = require('./模块地址'); 

* module.exports = xxx; 
  + let xxx = require('./模块地址'); 

导入自己写的模块需要加"./" 这样的地址，如果是导入NODE内置模块(或者安装的第三方模块)，直接写模块名字即可
  
**特点：**
只能在NODE环境下运行，不能再浏览器端运行

淘宝的“玉伯”之前开发过一款插件 sea.js, 旨在让浏览器端也能运行CommonJS模块规范，他把这种模块思想称之为“CMD”

现在sea.js 已经不用了，但是我们使用webpack打包的时候们，webpack支持CommomJS模块规范，所以我们直接可以使用CommomJS规范写代码，最后webpack帮我们编译为浏览器可以识别的代码！！

**ES6Module模块规范**

[ES6Module模块规范使用示例](./ES6Module) --- [阮一峰的博客链接(详细介绍了ES6模块化的使用)](https://es6.ruanyifeng.com/#docs/module)

* 导出
  + 支持export导出多个的“导入方式”
    - export let n = 100; 

    

        export let m = 200; 

    

        export const fn = function fn() {}; 

    - import * as C from './C.js'; 
    - import { n, m, fn } from './C.js'; 
        
        console.log(n, m, fn); 

  + 支持 export default 函数
  + 支持 export default 对象
    - import E from './E.js'; 
    - 浏览器端，此种方案，不能直接import的时候给E结构赋值，但是获取到E之后，可以单独自己解构
    - const {sum, fn}=E; 
  

        console.log(E); 

* 导入 
  + import只能放在最开始的位置; 
  + import A from './A.js'; 

webpack环境下，即支持CommonJS规范，也支持ES6Module规范，而且可以支持两者混着用「用ES6Module导出的，可以基于CommonJS导入...」

### 2. NPM的操作进阶

* 安装在 全局 & 本地 的区别
* 安装在本地如何使用命令
* npx「npm >5.2」

### 3.webpack的基础操作

[webpack使用示例](./webpack)

**安装**

想用webpack必须提前安装：webpack webpack-cli

@1 安装在全局
$ npm install webpack webpack-cli -g
* 优点：能直接使用命令 $ webpack
* 缺点：但是所有项目都用相同版本的webpack，如果想要不同版本实现起来非常麻烦「需要安装不同node版本进行webpack版本的切换」

@1 安装在当前项目中

$ npm init -y
$ npm install webpack webpack-cli --save-dev

OR

$ yarn add webpack webpack-cli --save-dev
* 缺点：不能直接使用webpack命令
* 优点：每个项目有自己单独的版本，不会导致版本冲突

======= 如何实现：安装在本地项目中，但是也可以使用命令进行打包？

**零配置使用**

@1 当npm版本大于5.2，直接使用npx运行对应的命令即可

$ npx webpack

**自定义基础配置**

webpack.config.js OR webpackfile.js

```
let path = require('path');
module.exports = {
    //=>打包模式  开发环境development  生产环境production
    mode: 'production',
    //=>入口
    entry: './src/index.js',
    //=>输出
    output: {
        //=>输出文件的文件名
        filename: 'bundle.[hash].js',
        //=>输出目录的"绝对路径"
        path: path.resolve(__dirname, 'dist')
    }
}
```

**自定义配置文件名**

 在package.json 中配置可执行脚本的命令

```
“script”: {
    // 脚本名字: 要执行的命令「前提：在node_modules目录的.bin文件夹下，需要有webapck这个命令文件，没有这个对应的文件，说明就没有对应的可执行命令」
    "build": "webpack"
}
```

$ npm run build // 先去package.json 中的scripts 中找到build; 没找到会报错，找到了，就会执行这个命令

=========
执行webpack命令
* 自己不写 webpack.config.js, 则默认找 src/index.js 打包输出到dist/main.js
* 如果自己写了 webpack.config.js, 则按照自己写个规则处理
* 真实项目中，往往是我们需要自己去区分环境「开发环境 & 生产环境」，两个环境走不同的配置，指定webpack打包时候，查找的规则文件
@1 创建不同的规则文件

    webpack.config.development.js

    webpack.config.production.js

@2 配置不同的脚本命令，执行某个命令，让其走自己对应的规则

```
"scripts": {
    "serve": "webpack --config webpack.config.development.js",
    "build": "webpack --config webpack.config.production.js"
},
```

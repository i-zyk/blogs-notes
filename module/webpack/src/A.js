const sum = function sum(...params) {
    let len = params.length;
    if (len === 0) return 0;
    if (len === 1) return params[0];
    return params.reduce((result, item) => {
        return result + item;
    });
};
// export default sum;
export default {
    sum
};

/*
    ES6Module中的模块导入导出规范
    「导出」
        export const n=100;
        export const m=200;
    「导入」
        import * as A from './A.js';
    「使用」
        A.n
        A.m
    -------------
    「导出」
        export default {
            sum,
            func
        };
    「导入」
        import A form './A.js';
        import {sum, func} from './A.js';
    
    export deault function sum() {};
    import sum from './A.js';
    同一个模块中，"export default" 只能用一次
    --------------

    export {xxx:xxx};
 */
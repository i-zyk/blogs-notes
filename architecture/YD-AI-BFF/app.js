"use strict";
exports.id = 71;
exports.ids = [71];
exports.modules = {

/***/ 287:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const module_alias_1 = __webpack_require__(577);
(0, module_alias_1.addAliases)({
    '@root': __dirname,
    '@interfaces': `${__dirname}/interface`,
    '@config': `${__dirname}/config`,
    '@middlewares': `${__dirname}/middlewares`,
});
const koa_1 = __importDefault(__webpack_require__(101));
const awilix_1 = __webpack_require__(548);
const co_1 = __importDefault(__webpack_require__(238));
const koa_swig_1 = __importDefault(__webpack_require__(470));
const index_1 = __importDefault(__webpack_require__(895));
const koa_static_1 = __importDefault(__webpack_require__(694));
const awilix_koa_1 = __webpack_require__(76);
// koa中没有实现的路由重定向到index.hmlt
const koa2_connect_history_api_fallback_1 = __webpack_require__(143);
const app = new koa_1.default();
const { port, viewDir, memoryFlag, staticDir } = index_1.default;
// 静态资源生效节点
app.use((0, koa_static_1.default)(staticDir));
const container = (0, awilix_1.createContainer)();
// 所有的可以被注入的代码都在container中
container.loadModules([`${__dirname}/services/*.ts`], {
    formatName: 'camelCase',
    resolverOptions: {
        lifetime: awilix_1.Lifetime.SCOPED,
    },
});
// 每一次用户请求router中 都会从容器中取到注入的服务
app.use((0, awilix_koa_1.scopePerRequest)(container));
app.context.render = co_1.default.wrap((0, koa_swig_1.default)({
    root: viewDir,
    autoescape: true,
    cache: memoryFlag,
    writeBody: false,
    ext: 'html',
}));
app.use((0, koa2_connect_history_api_fallback_1.historyApiFallback)({ index: '/', whiteList: ['/api'] }));
// 让所有的路由全部生效
app.use((0, awilix_koa_1.loadControllers)(`${__dirname}/routers/*.ts`));
if (false) // removed by dead control flow
{}
exports["default"] = app;


/***/ })

};
;
//# sourceMappingURL=app.js.map
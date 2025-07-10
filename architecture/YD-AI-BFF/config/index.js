"use strict";
exports.id = 769;
exports.ids = [769];
exports.modules = {

/***/ 895:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const lodash_1 = __importDefault(__webpack_require__(825));
const path_1 = __webpack_require__(928);
let config = {
    viewDir: (0, path_1.join)(__dirname, '..', 'views'),
    staticDir: (0, path_1.join)(__dirname, '..', 'assets'),
    port: 8081,
    memoryFlag: false,
};
if (false) // removed by dead control flow
{}
if (true) {
    let prodConfig = {
        port: 8082,
        memoryFlag: 'memory',
    };
    config = lodash_1.default.assignIn(config, prodConfig);
}
exports["default"] = config;


/***/ })

};
;
//# sourceMappingURL=index.js.map
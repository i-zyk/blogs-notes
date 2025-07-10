"use strict";
exports.id = 341;
exports.ids = [341];
exports.modules = {

/***/ 341:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handler = void 0;
const serverless_http_1 = __importDefault(__webpack_require__(277));
const app_1 = __importDefault(__webpack_require__(287));
// 将 Koa 应用包装为 Lambda 处理函数
exports.handler = (0, serverless_http_1.default)(app_1.default);


/***/ })

};
;
//# sourceMappingURL=341.js.map
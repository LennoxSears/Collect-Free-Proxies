"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var CDP = require("chrome-remote-interface");
var chrome_launcher_1 = require("chrome-launcher");
var local_runtime_1 = require("./local-runtime");
var util_1 = require("../util");
var LocalChrome = /** @class */ (function () {
    function LocalChrome(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.runtimeClientPromise = this.initRuntimeClient();
    }
    LocalChrome.prototype.initRuntimeClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, _a, _b, viewport, runtime;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.options.launchChrome) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.startChrome()];
                    case 1:
                        _a = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.connectToChrome()];
                    case 3:
                        _a = _c.sent();
                        _c.label = 4;
                    case 4:
                        client = _a;
                        _b = this.options.viewport, viewport = _b === void 0 ? {} : _b;
                        return [4 /*yield*/, util_1.setViewport(client, viewport)];
                    case 5:
                        _c.sent();
                        runtime = new local_runtime_1.default(client, this.options);
                        return [2 /*return*/, { client: client, runtime: runtime }];
                }
            });
        });
    };
    LocalChrome.prototype.startChrome = function () {
        return __awaiter(this, void 0, void 0, function () {
            var port, _a, target;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        port = this.options.cdp.port;
                        _a = this;
                        return [4 /*yield*/, chrome_launcher_1.launch({
                                logLevel: this.options.debug ? 'info' : 'silent',
                                port: port,
                            })];
                    case 1:
                        _a.chromeInstance = _b.sent();
                        return [4 /*yield*/, CDP.New({
                                port: port,
                            })];
                    case 2:
                        target = _b.sent();
                        return [4 /*yield*/, CDP({ target: target, port: port })];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    LocalChrome.prototype.connectToChrome = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, host, port, target;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.options.cdp, host = _a.host, port = _a.port;
                        return [4 /*yield*/, CDP.New({
                                port: port,
                                host: host,
                            })];
                    case 1:
                        target = _b.sent();
                        return [4 /*yield*/, CDP({ target: target, host: host, port: port })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    LocalChrome.prototype.setViewport = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, viewport, config, _b, host, port, versionResult, isHeadless, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this.options.viewport, viewport = _a === void 0 ? {} : _a;
                        config = {
                            deviceScaleFactor: 1,
                            mobile: false,
                            scale: viewport.scale || 1,
                            fitWindow: false,
                        };
                        _b = this.options.cdp, host = _b.host, port = _b.port;
                        return [4 /*yield*/, CDP.Version({ host: host, port: port })];
                    case 1:
                        versionResult = _e.sent();
                        isHeadless = versionResult['User-Agent'].includes('Headless');
                        if (!(viewport.height && viewport.width)) return [3 /*break*/, 2];
                        config.height = viewport.height;
                        config.width = viewport.width;
                        return [3 /*break*/, 6];
                    case 2:
                        if (!isHeadless) return [3 /*break*/, 3];
                        // just apply default value in headless mode to maintain original browser viewport
                        config.height = 900;
                        config.width = 1440;
                        return [3 /*break*/, 6];
                    case 3:
                        _c = config;
                        return [4 /*yield*/, util_1.evaluate(client, (function () { return window.innerHeight; }).toString())];
                    case 4:
                        _c.height = _e.sent();
                        _d = config;
                        return [4 /*yield*/, util_1.evaluate(client, (function () { return window.innerWidth; }).toString())];
                    case 5:
                        _d.width = _e.sent();
                        _e.label = 6;
                    case 6: return [4 /*yield*/, client.Emulation.setDeviceMetricsOverride(config)];
                    case 7:
                        _e.sent();
                        return [4 /*yield*/, client.Emulation.setVisibleSize({
                                width: config.width,
                                height: config.height,
                            })];
                    case 8:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalChrome.prototype.process = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            var runtime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.runtimeClientPromise];
                    case 1:
                        runtime = (_a.sent()).runtime;
                        return [4 /*yield*/, runtime.run(command)];
                    case 2: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    LocalChrome.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, _a, host, port;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.runtimeClientPromise];
                    case 1:
                        client = (_b.sent()).client;
                        if (!this.options.cdp.closeTab) return [3 /*break*/, 3];
                        _a = this.options.cdp, host = _a.host, port = _a.port;
                        return [4 /*yield*/, CDP.Close({ host: host, port: port, id: client.target.id })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        if (this.chromeInstance) {
                            this.chromeInstance.kill();
                        }
                        return [4 /*yield*/, client.close()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LocalChrome;
}());
exports.default = LocalChrome;
//# sourceMappingURL=local.js.map
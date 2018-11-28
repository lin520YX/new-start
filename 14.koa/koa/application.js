let EventEmitter = require('events');
let http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');
class Application extends EventEmitter {
    constructor() {
        super()
        this.middleware = [];
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
    }
    createContext(req, res) {
        let ctx = this.context;
        ctx.response = this.response;
        ctx.request = this.request;
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;

    }
    handleRequest(req, res) {
        // 先创建一个context对象
        // 要把所有中间件践行组合
        let ctx = this.createContext(req, res)
        this.middleware[0](ctx);
    }
    // 中间件方法 用来📱中间件
    use(callback) {
        this.middleware.push(callback);
    }
    listen(...args) {
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...args);
    }
}
module.exports = Application
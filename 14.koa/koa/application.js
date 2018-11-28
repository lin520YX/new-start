let EventEmitter = require('events');
let http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');
class Application extends EventEmitter {
    constructor() {
        super()
        this.middlewares = [];
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
        this.compose(ctx, this.middlewares);
    }
    compose(ctx, middlewares) { // promise 逻辑
        function dispatch(index) {
            if (index === middlewares.length) return Promise.resolve();
            let middleware = middlewares[index];
            return Promise.resolve(middleware(ctx, () => dispatch(index + 1)))
        }
        dispatch(0)
    }
    // 中间件方法 用来📱中间件
    use(callback) {
        this.middlewares.push(callback);
    }
    listen(...args) {
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...args);
    }
}
module.exports = Application
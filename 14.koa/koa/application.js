
let EventEmitter = require('events');
let http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');
let stream = require('stream');
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
        res.statusCode = 404;
        let p = this.compose(ctx, this.middlewares);
        p.then((data) => {
            let body = ctx.body;
            if (body instanceof stream) {
                res.statusCode = 204;
                res.setHeader('Content-type', 'text/html;charset=utf8');
                body.pipe(res);
            } else if (typeof body === 'number') {
                res.statusCode = 204;
                res.setHeader('Content-type', 'text/plain;charset=utf8');
                res.end(body);
            } else if (typeof body === 'string' || Buffer.isBuffer(body)) {
                res.statusCode = 204;
                res.setHeader('Content-type', 'text/plain;charset=utf8');
                res.end(body);
            } else if (typeof body === 'object') {
                res.statusCode = 204;
                res.setHeader('Content-type', 'application/json;charset=utf8');
                res.end(JSON.stringify(body));
            } else {
                res.statusCode = 200;
                res.end('Not Found');
            }
        })
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
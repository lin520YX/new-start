
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
        console.log(JSON.stringify(this.middlewares))
        p.then(function () {
            let body = ctx.body;
            if (body instanceof stream) { // 先判断流，在判断是不是对象
              body.pipe(res); // 异步方法
            }else if(typeof(body) === 'number'){
              res.setHeader('Content-Type', 'text/plain;charset=utf8');
              res.end(body.toString());
            }else if(typeof body == 'object'){
              res.setHeader('Content-Type','application/json;charset=utf8');
              res.end(JSON.stringify(body));
            }else if(typeof body === 'string' || Buffer.isBuffer(body)){
              res.setHeader('Content-Type', 'text/plain;charset=utf8');
              res.end(body);
            }else{
              res.end(`Not Found`);
            }
          }).catch(e=>{
            this.emit('error',e);
          });
    }
    compose(ctx, middlewares) { // promise 逻辑
        function dispatch(index) {
            if (index === middlewares.length) return Promise.resolve();
            let middleware = middlewares[index];
            return Promise.resolve(middleware(ctx, () => dispatch(index + 1)))
        }
       return dispatch(0)
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
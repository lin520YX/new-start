let EventEmitter = require('events');
let http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');
class Application extends EventEmitter{
    constructor(){
        super()
        this.middleware = [];
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = object.create(response);
    }
    handleRequest(req,res){

    }
    // 中间件方法 用来📱中间件
    use(callback){
        this.middleware.push(callback);
    }
    listen(...args){
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...args);
    }
}
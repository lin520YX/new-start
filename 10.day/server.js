let http = require('http');
// req 客户端的请求 可独流
// res 代表稍后 写响应的内容 可写流

let server = http.createServer(function(req,res){
    // 请求的方法就是大写的
    console.log(req.method)
    // 从/后面到# 前面的部分
    console.log(req.url)
    // 对象
    console.log(req.headers)
    // 如果有请求体 会触犯 ondata 事件 如果没有 会触发end 事件
    let arr= [];
    req.on('data',function(data){
        arr.push(data)
    })
    req.on('end',()=>{
        console.log(Buffer.concat(arr).toString());
        res.statusCode = 200;
        res.end('hello')//表示结束了
    })
}).listen(3000,'localhost',function(){
    console.log('3000 start')
})
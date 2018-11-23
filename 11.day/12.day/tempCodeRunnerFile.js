// tcp 上加上一些语义化的东西
// host 反向代理的过程 
// 断电续传 206 Range：bytes =0-100/total

//  304 缓存
// 网站有很多的资源都是静态文件 每次访问服务器时
// 缓存一般分为 对比缓存和强制缓存

// 强制缓存 例如百度logo
// cache-control 和 expires  资源会被强制缓存
let http = require('http');
let path = require('path');
let url = require('url');
let fs = require('fs');
let port = 3000;
let server = http.createServer((req, res) => {
    let {pathname} = url.parse(req.url);

    // 强制缓存 为了不受到强制缓存的干扰 你可以设置永远不缓存

    // res.setHeader('Cache-Control', 'no-cache');

    // res.setHeader('Cache-Control', 'max-age=10');
    // res.setHeader('Expires', new Date(Date.now()+10*1000).toGMTString());

    // 一般情况下 会先采用强制缓存 使用之后 10s不会在发送请求了 过了10s之后  对比一下文件看看有没有变化 如果没有变化 就去浏览器缓存当中找


    if (pathname == '/') {
        res.setHeader('Content-Type', 'text/html;charset=utf8');
        return fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
    }
    let realpath = path.join(__dirname, pathname);
    fs.stat(realpath, (err,statObj) => {
        res.setHeader('Last-Modified',statObj.ctime.toGMTString());
        let ctime= req.headers['if-modified-since'];
        console.log(req.headers)
        if(ctime === statObj.ctime.toGMTString()){
            res.statusCode=304;
            res.end();
        }else{
            fs.createReadStream(realpath).pipe(res);
        }
        // if (err) return res.statusCode = 404, res.end()
        // fs.createReadStream(realpath).pipe(res);
    })
}).listen(port, (error) => {
    // 如果端口被占用
    console.log(3000)
})
// // 端口号被占用 可以重启一个服务
// server.on('error', (err) => {
//     if (err.error === 'EADDRINUSE') {
//         server.listen(++port)
//     }
// })

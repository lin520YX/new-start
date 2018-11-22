// 一个服务器上写两个网站
//  修改host wenjian
// www.a1.cn  => 3000
// www.a2.cn  => 4000
let map = {
    "www.a1.cn": 'http://localhost:3000',
    "www.a2.cn": 'http://localhost:4000'
}
let http = require('http');
let httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer();
http.createServer((req, res) => {
    // let host = req.headers['host'];
    proxy.web(req, res, { target: map["www.a1.cn"] })
}).listen(80)


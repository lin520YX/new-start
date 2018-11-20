let http = require('http');
let fs = require('fs');
let path = require('path');
let url = require('url');
// let obj =url.parse('http://www.baidu.com:8080/s?a=1');
// console.log(obj)
// Url {
//     protocol: 'http:',
//     slashes: true,
//     auth: null,
//     host: 'www.baidu.com:8080',
//     port: '8080',
//     hostname: 'www.baidu.com',
//     hash: null,
//     search: '?a=1',
//     query: 'a=1',
//     pathname: '/s',
//     path: '/s?a=1',
//     href: 'http://www.baidu.com:8080/s?a=1' }
http.createServer(function(req,res){
    let {pathname} = url.parse(req.url);
    let realpath = path.join(__dirname,pathname);
    fs.access(realpath,(err)=>{
        if(err)return res.end('not Found');
        return fs.createReadStream(realpath).pipe(res)
    });
    // if(req.url=== '/ajax.html'){
    //     res.setHeader('Content-Type','text/html;charset=utf8');
    //     return fs.createReadStream(path.resolve(__dirname,'ajax.html')).pipe(res)
    // }
    if(req.url === '/login'){
        let arr =[];
        req.on('data',(data)=>{
            arr.push(data)
        })
        req.on('end',()=>{
            let str  = Buffer.concat(arr).toString();
            console.log(str)
          let obj =  require('querystring').parse(str);
          res.setHeader('Content-Type','application/json;charset=utf8')
          res.end(JSON.stringify(obj))
        //    let reg = /([^=&]+)=([^=&]+)/g;
        //    let obj ={};
        //     str.replace(reg,function(){
        //         obj[arguments[1]]=arguments[2]
        //     })
        //     console.log(obj)
        //     res.end(JSON.stringify(obj))
        })
    }
}).listen(3000,function(){
    console.log('300 start');
});
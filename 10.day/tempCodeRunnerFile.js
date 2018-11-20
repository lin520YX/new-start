let http = require('http');
let fs = require('fs');
let path = require('path');
let url = require('url');
let mime = require('mime');
let {promisify} = require('util');
let stat = promisify(fs.stat);
let access = promisify(fs.access);
http.createServer(async (req, res) =>{
    let { pathname } = url.parse(req.url);
    if(req.url === '/reg'){
        console.log(1)
        // let arr = [];
        // req.on('data',(data)=>{
        //     arr.push(data)
        // });
        // req.on('end',()=>{
        //     let str =Buffer.concat(arr).toString();
        //     console.log(str)
        //     // if(req.headers['content-type']==='application/json'){
        //     //     res.end(JSON.parse(str).name);
        //     // }else if(req.headers['content-type']==='application/www-x-form-urlencode'){
        //     //     res.end(require('querystring').parse(str).name);
        //     // }
        // })
        return;
    }
    let realpath = path.join(__dirname, pathname);
    let statObj = await stat(realpath);
    try {
        if(statObj.isDirectory()){
            let r = path.join(realpath,'index.html');
            await access(r);
            res.setHeader('Content-Type','text/html;charset=utf8')
            fs.createReadStream(r).pipe(res)
        }else{
            res.setHeader('Content-Type',mime.getType(realpath)+';charset=utf8');
            fs.createReadStream(realpath).pipe(res)
        }
    } catch (error) {
        res.statusCode = 404;
        res.end('Not Found')
    }
}).listen(3000, function () {
    console.log('300 start');
});

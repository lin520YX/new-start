let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let whiteLists = ['localhost','127.0.0.1']
http.createServer(function (req,res) {
  let {pathname} = url.parse(req.url,true);
  if(pathname === '/'){
    return fs.createReadStream(path.join(__dirname,'index.html')).pipe(res);
  }
  let realPath = path.join(__dirname,pathname);
  // 当前资源从那个网站上引用的，如果引用的地址不被信任的可以返回裂图 csrf
  fs.stat(realPath,(err,statObj)=>{
    if (err) return res.end();
    // 如果当前文件有referer 那就需要做防盗链
    console.log(req.headers['referer'])
    if (req.headers['referer']){
      // 防盗链
      let host = req.headers.host.split(':')[0];
      let referer = url.parse(req.headers['referer']).hostname;
      if (host === referer || whiteLists.includes(referer) ){
        fs.createReadStream(realPath).pipe(res);
      }else{
        fs.createReadStream(path.join(__dirname,'2.jpg')).pipe(res);
      }
    }else{
      fs.createReadStream(realPath).pipe(res);
    }
  })


}).listen(9999);
let http = require('http');
let fs = require('fs');
let statObj = fs.statSync('./1.txt');
http.createServer((req,res)=>{
    let range = req.headers.range;
    console.log(range)
    if(range){
      let [,start,end] =  range.match(/bytes=(\d*)-(\d*)/);
      start=start?Number(start):0;
      end = end?Number(end):statObj.size-1;
      res.statusCode = 206;
      res.setHeader('Content-Range',`bytes ${start}-${end}/${statObj.size}`);
      res.setHeader('Accept-Range','bytes')
      fs.createReadStream('./1.txt',{start,end}).pipe(res)
    }else{
        fs.createReadStream('./1.txt').pipe(res);
    }
}).listen(3000,()=>{
    console.log('3000  start')
})
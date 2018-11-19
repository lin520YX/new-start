let http = require('http');
http.createServer(function(req,res){
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
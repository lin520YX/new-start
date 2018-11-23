let http = require('http');
// 爬虫
// get 没有请求体
let client = http.request({
    host:'localhost',
    method:'post',
    port:3000,
    path:'/user',
    headers:{
        name:'lyf',
        'Content-Type':'application/x-www-form-urlencoded'
    }
},function(res){
    res.on('data',(data)=>{
        console.log(data.toString())
    })
})
// 请求体
client.end('age=9'); //请求体

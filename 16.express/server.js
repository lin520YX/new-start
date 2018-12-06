let express = require('express');
let app = express(); // app 是一个监听函数
app.get('/',function(req,res){
    res.end('get')
})
app.post('/',function(req,res){
    res.end('post')
})
app.listen(3000);
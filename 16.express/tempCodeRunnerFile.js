let express = require('express');
let app = express(); // app 是一个监听函数
//  封装在req 和res上
// 2.next 决定使得欧向下执行
app.use('/',function(req,res,next){
    console.log(1);
    next()
})
app.use(function(req,res,next){
    console.log(1);
    next()
})


app.listen(3000);
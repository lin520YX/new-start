let Koa = require('./koa/application');
let app = new Koa();
// ctx 上存在req 就是原生的req
// ctx 上有request 属性 和response 属性是自己封装的
let fs = require('fs');
let path = require('path');
app.use(async (ctx, next) => {
    ctx.body= fs.createReadStream(path.join(__dirname,'index.html'));
    // 如果一个promise 中等待着另外一个promise 会等地啊这个promise成功或失败才执行
})

app.listen(3000)
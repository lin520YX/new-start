let Koa = require('./koa/application');
let app = new Koa();
// ctx 上存在req 就是原生的req
// ctx 上有request 属性 和response 属性是自己封装的
app.use(async (ctx, next) => {
    // 如果一个promise 中等待着另外一个promise 会等地啊这个promise成功或失败才执行
    console.log(1)
    await next()   //()=>dispatch(index+1) 返回下一个async
    console.log(2)
})
app.use(async (ctx, next) => {
    console.log(3)
    await next()
    console.log(4)
})
app.listen(3000)
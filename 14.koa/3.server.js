let Koa = require('./koa/application');
let app = new Koa();
// ctx 上存在req 就是原生的req
// ctx 上有request 属性 和response 属性是自己封装的
app.use((ctx)=>{
    ctx.res.end('1111')
    console.log(ctx.req.url)
    console.log(ctx.request.req.url);
    console.log(ctx.request.url);
    console.log(ctx.url); //做了拦截 当我们在ctx 上取值时候 回去 ctx.request 上取值
})
app.listen(3000)
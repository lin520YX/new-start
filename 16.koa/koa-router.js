let Koa = require('koa');
let Router = require('./c-route');
let router = new Router()
let app = new Koa();
router.get('/',async(ctx,next)=>{
    ctx.body = 'hello'
})
app.use(router.routes());
app.listen(3003,()=>{
    console.log('3003 start server')
})
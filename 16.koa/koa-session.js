let Koa = require('koa');
let app = new Koa();
let session = require('koa-session');
let Router = require('koa-router');
let router = new Router();
app.use(session({},app))
app.keys=['aaa','bbb'];
app.use(router.routes());
router.get('/visit',async (ctx,next)=>{
    if(ctx.session.visit){
        ctx.body = ++ctx.session.visit
    }else{
        ctx.session.visit=1
        ctx.body = '第一次'
    }
})
app.listen(3000);
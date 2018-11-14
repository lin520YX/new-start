const Koa = require('koa');
const Router = require('koa-router');
let router = new Router();
let app = new Koa();
router.get('/a',async ctx=>{
    ctx.response.body = 'Hello World';
})
app.use(router.routes())
app.listen(3000)
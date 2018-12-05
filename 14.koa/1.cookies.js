const Koa = require('koa');
const Router = require('koa-router');
let router = new Router();
let app = new Koa();
router.get('/a',async ctx=>{
    ctx.response.body = 'Hello World';
})
app.use(router.routes())
app.listen(3000)

// localstorage sessionStorage cookie session
// localStorage 5M
// seesionStorage  浏览器关闭就清空了
// localstorage 不能跨域


// cookie 每次请求可以携带（同域）withCredentials
// 不能跨域设置cookie
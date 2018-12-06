const Koa = require('koa');
let app = new Koa();
const Router = require('koa-router');
let router = new Router();
router.get('/a', async ctx => {
    ctx.body = ctx.cookies.get('name');

})
app.keys=['hellos']
router.get('/b', async ctx => {
    ctx.cookies.set('name', 'lyf', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 10),
        signed:true
    });
    ctx.body = 'aaa'
})
app.use(router.routes())
app.listen(3000)

// localstorage sessionStorage cookie session
// localStorage 5M
// seesionStorage  浏览器关闭就清空了
// localstorage 不能跨域


// cookie 每次请求可以携带（同域）withCredentials
// 不能跨域设置cookie
// 登录凭证
// cookie 不安全 会被串改
// 一般不会在cookie 中存储 敏感信息

// let http = require('http');
// http.createServer((req, res) => {
//     if (req.url === '/read') {
//         res.setHeader('Set-Cookie', `name=lyf;path=/read;maxAge=6`)
//         res.end('h')
//     }
// }).listen(3000, () => {
//     console.log('3000')
// })
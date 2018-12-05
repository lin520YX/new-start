let Koa = require('koa');
// let views = require('koa-views');
let path = require('path');
let Router = require('koa-router');
let app = new Koa();
let router = new Router()


function views(p, opts) {
    let path = require('path');
    let fs = require('mz/fs');
    console.log('p',p)
    return async (ctx, next) => {
        ctx.render = async (dirname, data) => {
            let ejs = require(opts.map.html);
            let tempStr = await fs.readFile(path.join(p, dirname), 'utf8');
            console.log('tempStr',tempStr)
            ctx.set('Content-type', 'text/html;charset=utf8');
            ctx.body = ejs.render(tempStr, data);
        }
        return next();
    }
}








app.use(views(path.join(__dirname), {
    map: {
        html: 'ejs'
    }
}));
router.get('/', async (ctx, next) => {
    console.log(1)
    await ctx.render('template.html', { arr: [1, 2, 3] });
});
// app.use(async(ctx)=>{
//     ctx.body = 'hello'
// })
app.use(router.routes())
app.listen(3001, () => {
    console.log('3001 server Start')
})
let Koa = require('koa');
let views = require('koa-views');
let path = require('path');
let Router = require('koa-router');
let app = new Koa();
let router = new Router()
app.use(views(path.join(__dirname),{
    extension:'html'
}));
router.get('/',async (ctx,next)=>{
    console.log(1)
    await ctx.render('template.html',{arr:[1,2,3]});
});
app.use(router.routes())
app.listen(3001)
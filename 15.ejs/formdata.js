let Koa =require('koa');
let app = new Koa();
let path = require('path');
let fs = require('fs');
let body = require('koa-better-body');
let convert = require('koa-convert');
app.use(convert(body({
  uploadDir:path.join(__dirname,'upload')
})));
app.use(async(ctx,next)=>{
    if(ctx.path == '/'){
        ctx.set('Content-Type','text/html;charset=utf8');
        ctx.body = fs.createReadStream(path.join(__dirname,'./formdata.html'));
    }else{
        await next()
    }
})
app.use(async(ctx,next)=>{
    if (ctx.path == '/upload') {
        console.log(111)
        ctx.body = ctx.request.fields;
      } 
})
app.listen(3000,()=>{
    console.log(`3000 serverStart`)
})
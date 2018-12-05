let Koa = require('koa');
// let static = require('koa-static');
let path = require('path')
let app = new Koa();
let fs = require('mz/fs');
function static(dirname){
    return async(ctx,next)=>{
        let realPath= path.join(dirname,ctx.path);
        console.log(realPath)
        try{
            let statObj = await fs.stat(realPath);
            if(statObj.isFile()){
                ctx.set('Content-type','text/html;charset=utf8')
                ctx.body =  fs.createReadStream(realPath)
            }else{
                realPath = path.join(realPath,'index.html');
                await fs.access(realPath);
                ctx.body = fs.createReadStream(realPath);
            }
        }catch(e){
            await next();
        }
    }
}


app.use(static(path.join(__dirname,'views')));
app.listen(3000)
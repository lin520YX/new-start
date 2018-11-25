let Koa = require('koa');
//  创建koa 的实例
let app = new Koa();
// 请求到来时 会执行第一个中间件
// next  进行下一个函数
app.middleware = [];
app.use=function(cb){
    app.middleware.push(cb)
}
app.use((ctx,next)=>{   
    console.log('1')
})

let port = 3000;
app.listen(port,'localhost',()=>{
    console.log(`server start ${port}`)
})

// redux compose
app.middleware.reduceRight((prev,next)=>{
    return ()=>next(prev)
},()=>{})
// function dispatch(index){
//     if(index==app.middleware.length)return ()=>{};
//     let route = app.middleware[index];
//     route(()=>dispatch(index+1))
// }
// dispatch(0);
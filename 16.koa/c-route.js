class Layer{
    constructor(pathname,cb){
        this.pathname = pathname;
        this.cb = cb;
    }
}
class Router{
    constructor(){
        this.arr = [];
    }
    get(pathname,cb){
        this.arr.push(new Layer(pathname,cb));
    }
    compose(ctx,arr,next){
        function dispatch(index) {
            if(index === arr.length) return next();
            let route = arr[index];
            console.log(route)
            route(ctx,()=>dispatch(index+1));
          }
          dispatch(0);
    }
    routes(){
        return async(ctx,next)=>{
            let arr = this.arr.filter(s=>s.pathname==ctx.path);
            arr = arr.map(s=>s.cb);
            console.log(arr)
            this.compose(ctx,arr,next);
        }
    }
}
module.exports = Router;
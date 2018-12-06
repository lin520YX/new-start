let http = require('http');
let methods= require('methods');
let url = require('url');
function Application(){
    function app(req,res){
        let {pathname} = url.parse(req.url,true)
        let method = req.method.toLowerCase();
        for(let i =0 ;i<app.routes.length;i++){
            let layer = app.routes[i];
            let {method:m,path,callback} = layer;
            if(method == m&&path==pathname){
                return callback(req,res);
            }
        }
        res.end(`cannot ${method} ${pathname}`)
    }
    methods.forEach(method=>{
        app[method]=function(path,callback){
            let layer ={
                method,path,callback
             }
             app.routes.push(layer);
        }
    })
    app.listen(function(...args){
        let server = http.createServer(app);
        server.listen(...args);
    })
    return app;
}
module.exports = Application;
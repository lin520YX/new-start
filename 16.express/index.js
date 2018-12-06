let http = require('http');
let methods = require('methods');
let url = require('url');
function Application() {
    function app(req, res) {
        let { pathname } = url.parse(req.url, true)
        let method = req.method.toLowerCase();
        for (let i = 0; i < app.routes.length; i++) {
            let layer = app.routes[i];
            let { method: m, path, callback } = layer;
            if (((method == m) || (m == 'all')) && ((path == pathname) || (path == '*'))) {
                return callback(req, res);
            }
        }
        res.end(`cannot ${method} ${pathnamenm}`)
    }
    [...methods, 'all'].forEach(method => {
        app[method] = function (path, callback) {
            let layer = {
                method, path, callback
            }
            if (path.include(':')) {
                layer.path = new RegExp(path.replace(/:([^\/])/g,function(){
                    layer.params.push(arguments[1]);
                    return '([^\/])'
                }));
            }
            app.routes.push(layer);
        }

    })
    app.listen(function (...args) {
        let server = http.createServer(app);
        server.listen(...args);
    })
    return app;
}
module.exports = Application;
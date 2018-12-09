let http = require('http');
let methods = require('methods');
let url = require('url');
function Application() {
    function app(req, res) {
        let { pathname } = url.parse(req.url, true)
        let method = req.method.toLowerCase();
        let i = 0;
        function next(err) {
            if (app.routes.length === i) {
                return res.end(`cannot ${method} ${pathnamenm}`)
            }
            let layer = app.routes[i++];
            let { method: m, path, callback } = layer;
            // 错误中间件
            if (err) {
                if (m === 'middleware') {
                    if ((path === '/' || path === pathname || pathname.startsWith(path + '/')) && (callback.length === 4)) {
                        return callback(err, req, res, next);
                    } else {
                        next(err); // 如果有错误 把错误继续带下去即可
                    }
                } else {
                    next(err);
                }
            } else {
                if (m == 'middleWare') {
                    // 中间件的特点匹配路径 开头相同就能执行
                    if (path === '/' || path === pathname || pathname.startsWith(path + '/')) {
                        // 把下一次的权限给用户
                        return callback(req, res, next);
                    } else {
                        next();
                    }
                } else {
                    if (layer.params.length) {
                        if (path.test(pathname)) {
                            let [, ...args] = pathname.match(path);
                            req.params = layer.params.reduce((memo, key, index) => (memo[key] = args[index], memo), {});
                            return callback(req, res);
                        }
                    }
                    if (((method == m) || (m == 'all')) && ((path == pathname) || (path == '*'))) {
                        return callback(req, res);
                    }
                    next();
                }
            }

        }
        next();

    }
    app.routes = [];
    app.use = function (path, callback) {
        if (typeof callback != 'function') {
            callback = path;
            path = '/'
        }
        let layer = {
            method: 'middleWare',
            path,
            callback
        }
        app.routes.push(layer);

    };
    [...methods, 'all'].forEach(method => {
        app[method] = function (path, callback) {
            let layer = {
                method, path, callback
            }
            if (path.include(':')) {
                layer.path = new RegExp(path.replace(/:([^\/])/g, function () {
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

    //  内置的中间件
    app.use(function (req, res, next) {
        let { pathname, query } = url.parse(req.url, true);
        req.path = pathname;
        req.query = query;
        res.sendFile = function (url) {
            fs.createReadStream(url).pipe(res);
        }
        res.send = function (val) {
            if (typeof val === 'string' || Buffer.isBuffer(val)) {
                res.setHeader('Content-Type', 'text/plain;charset=utf8');
                res.end(val);
            } else if (typeof val == 'object') {
                res.setHeader('Content-Type', 'application/json;charset=utf8');
                res.end(JSON.stringify(val));
            } else if (typeof val === 'number') {
                res.statusCode = val;
                res.end(require('_http_server').STATUS_CODES[val]);
            }
        }
        next();
    })
    return app;
}

Application.static = function (pathname) {
    return function (req,res,next) {
      let realPath = path.join(pathname,req.path);
      fs.stat(realPath,function (err,statObj) {
        if(err){
          next();
        }else{
          if(statObj.isDirectory()){
            // todo;
          }else{
            res.sendFile(realPath);
          }
        }
      })
    }
}
module.exports = Application;
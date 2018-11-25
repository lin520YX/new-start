let http = require('http');
let fs = require('mz/fs');
let url = require('url');
let path = require('path');
let mime = require('mime');
let chalk = require('chalk');
let debug = require('debug')('dev');
let ejs = require('ejs')
let { readFileSync } = require('fs');
let tmpl = readFileSync(path.join(__dirname, 'template.html'), 'utf8');
let zlib = require('zlib');
class Server {
    constructor(config) {
        this.config = config;
        this.tmpl = tmpl;
    }
    async handleRequest(req, res) {
        // 先看当前访问的路径是否是文件夹 如果是文件夹找index.html
        // 如果没有index.htnl 返回目录结果
        // 如果是文件 直接现实就可以
        let { dir } = this.config;
        let { pathname } = url.parse(req.url);

        let realPath = path.join(dir, pathname);
        try {
            let statObj = await fs.stat(realPath)
            if (statObj.isDirectory()) {
                let html = path.join(realPath, 'index.html');
                try {
                    await fs.access(html);
                    this.sendFile(req, res, null, html);
                } catch (error) {
                    let dirs = await fs.readdir(realPath);
                    let renderstr = ejs.render(this.tmpl, {
                        dirs: dirs.map(item => ({
                            n: item, // 路径的名字
                            path: path.join(pathname, item)
                        }))
                    });
                    res.setHeader('Content-type', 'text/html;charset=utf8');
                    res.end(renderstr)
                }
            } else {
                this.sendFile(req, res, statObj, realPath);
            }
        } catch (error) {
            this.sendError(req, res, error)
        }
        // res.end('start');
    }
    sendError(req, res, e) {
        console.log(e)
        res.statusCode = 404;
        res.end('Not Found');
    }
    sendFile(req, res, statObj, realPath) {
        console.log(realPath)
        // 下次更新内容
        // 缓存 304  强制缓存 + 对比缓存
        // 206 范围请求   range的实现
        let gizp;
        res.setHeader('Content-type', mime.getType(realPath) + ';charset=utf8');
        if (gizp = this.gzip(req, res)) {
            fs.createReadStream(realPath).pipe(gizp).pipe(res);
            return;
        }
        fs.createReadStream(realPath).pipe(res);
    }
    gzip(req, res) {
        let gizp = req.headers['accept-encoding'];
        if (gzip) {
            if (gzip.match(/\bgzip\b/)) {
                res.setHeader('Content-Encoding','gzip');
                return zlib.createGzip()
            } else if (this.gzip.match(/\bdeflate\b/)) {
                res.setHeader('Content-Encoding', 'deflate');
                return zlib.createDeflate()
            }
        } else {
            return false;
        }
    }
    start() {
        let server = http.createServer(this.handleRequest.bind(this));
        let { port, host } = this.config;
        function _server(){
            server.listen(port, host, () => {
                debug(`http://${host}:${chalk.red(port)} sever start`);
            })
        }
        _server()
        server.on('error', (err) => {
            if (err.error === 'EADDRINUSE') {
                ++port
               _server()
            }
        })
    }
}
module.exports = Server;
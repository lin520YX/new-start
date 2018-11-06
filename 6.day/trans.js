// 写一个require 方法
let fs = require('fs');
let path = require('path');
function Module(id) {
    this.id = id; //这是 文件路径
    this.exports = {};
}

Module.extensions = {
    '.js'() {

    },
    '.json'(md) {
        md.exports = fs.readFileSync(md.id, 'utf8')
    }
}
// 加载文件
Module._load = function (filename) {
    let realPath = Module._resolveFilename(filename);
    return realPath;
}
// 获取文件的绝对路径
Module._resolveFilename = function (filename) {
    let extnames = Object.keys(Module.extensions);
    let r = path.resolve(__dirname, filename);
    if (!path.extname(r)) {
        for (let i = 0; i < extnames.length; i++) {
            let p = r + extnames[i]
            try {
                fs.accessSync(p);
                return p;
            } catch (error) {

            }
        }
    } else {

    }
}
function req(str) {
    let r = Module._load(str);
    let md = new Module(r);
    //    获取扩展名
    let ext = path.extname(md.id);
    Module.extensions[ext](md)
    return md.exports
}
req('name')
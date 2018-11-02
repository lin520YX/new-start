// 模块 主要解决协同开发的问题
// 避免全局变量 防止崇明

// 模块化都是依靠必包实现的

let str = require('1.js');

let fn = `(function a(){console.log(a)})()`;
let vm = require('vm');
vm.runInThisContext(fn)


let fs = require('fs');

let path = require('path'); // 相对路径转绝对路径
// __dirname 当前目录下的文件夹
console.log(path.resolve(__dirname,'1.js'))
console.log(path.join(__dirname,'1.js'))
console.log(path.join('a','/'))
console.log(path.extname('1.min.js'))
console.log(path.basename('1.min.js','.min.js'))
try {
    fs.accessSync('1.js')
} catch (error) {
    console.log(error)
}
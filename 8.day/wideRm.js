let fs = require('fs');
let path = require('path');

function wide(p, cb) {
    let arr = [p]; //储备广度路径
    function next(index) {
        if (index === arr.length) return remove();
        let current = arr[index];
        fs.stat(current, (err, statObj) => {
            if (statObj.isDirectory()) {
                fs.readdir(current, (err, dirs) => {
                    dirs = dirs.map(dir => path.join(current, dir));
                    arr = [...arr, ...dirs];
                    // 下
                    next(index + 1);
                });
            } else {
                // 下
                next(index + 1);
            }
        });
    }
    next(0);
    
    // 递归删除 5,3,3,2,1
    function remove() {
        function next(index) {
            if (index < 0) return cb();
            let current = arr[index];
            fs.stat(current, (err, statObj) => {
                if (statObj.isDirectory()) {
                    fs.rmdir(current, () => next(index - 1));
                } else {
                    fs.unlink(current, () => next(index - 1));
                }
            });
        }
        next(arr.length - 1);
    }
}
wide('m', () => {
    console.log('delete')
})

let { promisify } = require('util')
let stat = promisify(fs.stat);
let readdir = promisify(fs.readdir);
let unlink = promisify(fs.unlink);
let rmdir = promisify(fs.rmdir);
async function wideRm(p) {
    let index = 0;
    let arr = [p];
    while (index !== arr.length) {
        let current = arr[index];
        let statObj = await stat(current);
        if (statObj.isDirectory()) {
            let dirs = await readdir(current);
            dirs = dirs.map(d => path.join(current, d))
            arr = [...arr, ...dirs];
        }
        index++;
    }
    // 记录地址
    let current='';
    while ((current = arr.pop())) {
        let statObj = await stat(current);
        if (statObj.isDirectory()) {
            await rmdir(current);
        } else {
            await unlink(current);
        }
    }
}
wideRm('m').then(() => {
    console.log('deletr')
})
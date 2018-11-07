let fs = require('fs');
let path = require('path')
// rmdirSync 删除目录
// unlinkSync 删除文件

// 读取文件 readdirSync
// function rmdir(){

// }

// function removeDepSync(p) {
//     let statObj = fs.statSync(p);
//     if (statObj.isDirectory()) {
//         // 删除子文件
//         let dirs = fs.readdirSync(p);
//         dirs = dirs.map(d => path.join(p, d));
//         dirs.forEach(element => {
//             removeDepSync(element);
//         });
//         fs.rmdirSync(p);
//     } else {
//         fs.unlinkSync(p);
//     }
// }
// removeDepSync('m')
// parell
function removeDep(p, cb) {
    fs.stat(p, function (err, statObj) {
        //    判断是文件夹还是文件
        if (statObj.isDirectory()) {
            /**
             * 第一次 next 执行走的是removeDep 第二次执行的是第二个 第三次 走的是第一次removeDep
             */
            fs.readdir(p, function (err, dirs) {
                dirs = dirs.map(d => path.join(p, d));//['m/n','m/b']
                function next(index) {
                    if (index === dirs.length) return fs.rmdir(p, cb);
                    let currentPath = dirs[index];
                    // 删除第一个儿子
                    // 删除完成之后再去删除 下一项目
                    removeDep(currentPath, () => next(index + 1));
                }
                next(0);
            })
        } else {
            fs.unlink(p, cb);
        }
    });
}

// fs.stat()，它返回一个Stat对象，能告诉我们文件或目录的详细信息：
// 1.异步版：fs.stat(path,callback):
//     path是一个表示路径的字符串,callback接收两个参数(err,stats),其中stats就是fs.stats的一个实例；

// 2.同步版：fs.statSync(path)
//    只接收一个path变量，fs.statSync(path)其实是一个fs.stats的一个实例；


function removeDepParell(p, cb) {
    fs.stat(p, function (err, statObj) {
        //    判断是文件夹还是文件
        if (statObj.isDirectory()) {
            /**
             * 第一次 next 执行走的是removeDep 第二次执行的是第二个 第三次 走的是第一次removeDep
             */
            fs.readdir(p, function (err, dirs) {
                if (dirs.length > 0) {
                    let index = 0;
                    function done() {
                        index++;
                        if (index === dirs.length) {
                            fs.rmdir(p, cb)
                        }
                    }
                    dirs.forEach(d => {
                        removeDepParell(d, done);
                    })
                    // 并行删除
                } else {
                    fs.rmdir(p, cb);
                }
            })
        } else {
            fs.unlink(p, cb);
        }
    });
}

let fs = require('fs');
let path = require('path');
// promise 版本
function removeDepParell(p) {
    return new Promise((resolve, reject) => {
        fs.stat(p, function (err, statObj) {
            //    判断是文件夹还是文件
            if (statObj.isDirectory()) {
                /**
                 * 第一次 next 执行走的是removeDep 第二次执行的是第二个 第三次 走的是第一次removeDep
                 */
                fs.readdir(p, function (err, dirs) {
                    dirs = dirs.map(p => removeDepParell(path.join(p, d)))
                    Promise.all(dirs).then(() => {
                        fs.rmdir(p, resolve);
                    })
                })
            } else {
                fs.unlink(p, resolve);
            }
        });
    })

}

let {promisify} = require('util');
let stat = promisify(fs.stat);
let readdir = promisify(fs.readdir);
let unlink = promisify(fs.unlink);
let rmdir = promisify(fs.rmdir);
async function removeDepParell(p) {
   let statObj = await stat(p)
   if (statObj.isDirectory()) {
        let dirs = await readdir(p);
        dirs.map(d=>removeDepParell(path.join(p,d)))
        await Promise.all(dirs);
        await rmdir(p);
    } else {
        await unlink(p)
    }
}
// async await


// wide 
function wide(p){
    let arr = [p]
    let index =0;
    let currentPath = '';
    while(currentPath=arr[index++]){
       let statObj = fs.statSync(currentPath);
       if(statObj.isDirectory()){
            let dirs = fs.readdirSync(currentPath);
            dirs = dirs.map(d=>path.join(currentPath,d))
            arr=[...arr,...dirs];
       }
    }
     for(let i = arr.length-1;i>=0;i--){
        let statObj = fs.statSync(arr[i]);
        if(statObj.isDirectory()){
            fs.rmdirSync(arr[i])
        }else{
            fs.unlinkSync(arr[i])
        }
     }
}
// 异步广度删除
// async await
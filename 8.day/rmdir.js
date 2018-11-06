let fs = require('fs');
let path = require('path')
// rmdirSync 删除目录
// unlinkSync 删除文件

// 读取文件 readdirSync
// function rmdir(){

// }

function removeDepSync(p){
    let statObj = fs.statSync(p);
    if(statObj.isDirectory()){
        // 删除子文件
       let dirs = fs.readdirSync(p);
       dirs.map(d=>path.join(p,d));
       dirs.forEach(element => {
           removeDepSync(element);
       });
       fs.rmdirSync(p);
    }else{
        fs.unlinkSync(p);
    }
}
removeDepSync('m')
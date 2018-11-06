// 创建目录和删除目录
let fs = require('fs');

// fs.rmdir('a')


// 文件存在后不能再次创建
// function mkdirSync(path){
//     let dirs = path.split('/');
//     for(let i=0;i<dirs.length;i++){
//         let currentPath=dirs.slice(0,i+1).join('/');
//         try {
//             fs.accessSync(currentPath)
//         } catch (error) {
//             fs.mkdirSync(currentPath);
//         }
//     }
// }
// mkdirSync('m/q/d')


function mkdir(path,callback){
    let dirs = path.split('/');
    let index =0;
    function next(){
        if(index === dirs.length)return callback();
        let currentPath =dirs.slice(0,++index).join('/');
        fs.access(currentPath,function(err){
            if(err){
                fs.mkdir(currentPath,()=>{
                    next()
                });
            }else{
                next();
            }
        })
    }
    next()
}
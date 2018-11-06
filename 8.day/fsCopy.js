
// copy
let fs = require('fs');
function copy(source, target) {
    // 打开资源文件
    const BUFFER_SIZE = 3
    let read_position =0;
    fs.open(source, 'r', function(err, rfd) {
        // 打开目标文件
        fs.open(target, 'w',function (err, wfd){
            let buffer = Buffer.alloc(BUFFER_SIZE);
            // 读取文件的长度
            function next(){
                fs.read(rfd,buffer,0,BUFFER_SIZE,read_position,(err,byteRead)=>{
                    if(byteRead){
                        read_position+=byteRead;
                        fs.write(wfd,buffer,0,byteRead,null,()=>{
                            next()
                        })
                    }else{
                        fs.close(rfd,()=>{});
                        fs.fsync(wfd,()=>{fs.close(wfd,()=>{})})
                    }
                })
            }
            next()
        })
    })
}
copy(`1.js`, '2.js')
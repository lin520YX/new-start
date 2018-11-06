// 有限的内存读取无限的数据

// 精确读取
let fs = require('fs');
// node 默认会占用 0 ,1,2 
// 可以读取文件
// fs.open('1.txt','r',(err,fd)=>{
//     let buffer = Buffer.alloc(3);
//     fs.read(fd,buffer,0,3,0,(err,bytesRead)=>{
//         console.log(bytesRead)
//         fs.close(fd,()=>{

//         });
//     })
// })

// 写
let fs = require('fs');
fs.open('1.txt','w',(err,fd)=>{
    let buffer = Buffer.from('云富');
    fs.write(fd,buffer,1,3,0,(err,written)=>{
        console.log(written)
        // 更新内存
        // fs.fsync();
    })
})
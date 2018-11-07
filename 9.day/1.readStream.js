// 流 并不关心整体文件大小 每次读取一点 从那个位置读取到哪里 
// 可读流 写流 双工流

// 读取文件时 需要用到文件的流

let fs= require('fs'); //fs.read //不用显示的调用fs.read
// rs 就是可读流对象 ， 通过可读流 创建出来的实例
let rs =fs.createReadStream('./1.js',{
    flags:'r',
    encoding:'utf8',
    // 读2 写4 执行1
    // mode:'0o666'
    autoClose:true,
    start:0,
    // end:6, //包前包后
    highWaterMark:64*1024 //每次读取 64k
}) 
rs.on('open',(data)=>{
    console.log('dk')
})
// 默认情况下 非流动模式 如果舰艇了data 事件 就会变成流动模式 ，不停的读取文件将文件读取完毕 最终会触发end
rs.on('data',(data)=>{
    console.log(data)
    rs.pause(); // 当前的事件 暂停触发
})
setTimeout(()=>{
    rs.resume(); //恢复
},1000)
rs.on('end',()=>{
    console.log('wb')
})
rs.on('close',(data)=>{
    console.log('gb')
})
rs.on('error',(data)=>{
    console.log('cc')
})
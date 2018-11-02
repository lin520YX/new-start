// 在浏览器中this 指代window
// 在window 代理了global 
//  在文件中执行 this 不是global  (模块化；在每个文件之外都套了一个闭包)； this 指向module.exports
// 在node 中this 就是global

// process 是一个对象 存储了一些信息
// buffer 操作文件 2进制 （16进制储存）

// 默认情况 v8上的方法

// process.stdout.write('呵呵呵')//标准输出
// process.stderr.write('呵呵呵')// 错误输出
// process.stdin.on('data',(data)=>{
//     console.log(data.toString())
// })

// process中 存在id
// process.pid

// 退出
// process.exit()

// 工作目录  可以用来后续启动项目时 知道用户在那个目录下启动的
// process.cwd()

// 更改目录
// process.chdir()

// 微任务
// prcess.nectTick(()=>{

// })

// 宏任务 messagechannel setImmedate 
// then nextTick mutationObserable

// node 当中也存在一个事件环
// 

let fs = require('fs');
fs.readFile('aa.js',()=>{
    setTimeout(()=>{
        console.log(2)
    })
    setImmediate(()=>{
        console.log(1)
    })
})

1
2
let fs = require('fs');
// 异步回调嵌套 会导致代码难以维护
// fs.readFile('./name.txt','utf8',(err,data)=>{
//     fs.readFile('./age.txt','utf8',(err,data)=>{
    
//     })
// })
// 多个异步同时执行
let obj ={}
fs.readFile('./name.txt','utf8',(err,data)=>{
    obj.name=data;
    out()
})
fs.readFile('./age.txt','utf8',(err,data)=>{
    obj.age=data;
    out();
})
function out(){
    if(Object.keys(obj).length===2){
        console.log(obj)
    }
}

// 发布订阅模式
// 先把需要订阅的内容保存到队列中 当发布（emit）时候依次执行 先进先出

// 观察者模式 基于发布订阅
let obj ={}
let Dep={
    arr:[],
    on(fn){
        this.arr.push(fn)
    },
    emit(){
        if(Object.keys(obj).length===2){
            this.arr.forEach(fn=>fn());
        }
    }
}
Dep.on(function(){
    console.log(obj)
})
fs.readFile('./name.txt','utf8',(err,data)=>{
    obj.name=data;
    Dep.emit()
})
fs.readFile('./age.txt','utf8',(err,data)=>{
    obj.age=data;
    out();
    Dep.emit()
})


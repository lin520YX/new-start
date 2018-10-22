// promise 可以解决什么?
// 1.回调地域 2。多个异步请求同时间合并结果
// 当前流行浏览器自带
// Promise 使用时 需要new Promise

let p = new Promise((resolve,reject)=>{

})
// Promise 承诺 一个类型
// new Promise 时需要传递一个executor 的执行器(同步执行)
// executor 中有两格参数 resolve 成功 reject 失败
// 每个Promise实例都存在一个then 的方法
// promise 中有三个状态pending -》 resolve /reject;
// pending->resolve pending-reject 不能和rejected进行相互转换

let fs = require('fs');
let arr =[];
function read(url,encoding){
    return new Promise((resolve,reject)=>{
        fs.readFile(url,encoding,(err,data)=>{
            if(err)reject(err);
            resolve(data)
        })
    })
}
read('name.txt','utf8').then((data)=>{
    return read(data,'utf8')
}).then(data=>{
    console.log(data)
},err=>{
    console.log(err)
})
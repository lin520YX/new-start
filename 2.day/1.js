let MyPromise = require('./promise')
let p = new MyPromise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('hello')
        },1000)
})
p.then((value)=>{
    console.log(value)
},(reason)=>{
    console.log(reason)
})
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

// let fs = require('fs');
// let bluebird = require('bluebird'); // node中已经吸纳
// let read = bluebird.promisify(fs.readFile);
// read('age.txt','utf8').then((data)=>{
//     console.log(data)
// })

let bluebird={
    promisify(fn){
        return function(...args){
            return new Promise((resolve,reject)=>{
                fn(...args,(err,data)=>{
                    if(err)reject(err);
                    resolve(data)
                })
            })
        }
    },
    promisifyAll(obj){
        for(let key in obj){
            obj[key+'Async']=this.promisify(obj[key]);
        }
    }
}
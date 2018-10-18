let promise = require('./1.promise')
new promise((resolve,reject)=>{
    resolve('hello')
}).then((val)=>{
    console.log(val)
})
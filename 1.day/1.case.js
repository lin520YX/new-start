let promise = require('./1.promise')
new promise((resolve,reject)=>{
    resolve(1)
}).then((val)=>{
    console.log(val)
})
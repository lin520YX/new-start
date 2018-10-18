let Lpromise = require('./1.promise');
let fs = require('fs');
// function read(url){
//     return new Lpromise((resolve,reject)=>{
//         fs.readFile(url,'utf8',(err,data)=>{
//             if(err)reject(err);
//             resolve(data)
//         })
//     })
// }
function read(url){
    let dfd = Lpromise.defer();
    fs.readFile(url,'utf8',(err,data)=>{
        if(err)dfd.reject(err);
        dfd.resolve(data)
    })
}
read('name.txt').then((data)=>{
console.log(data)
})

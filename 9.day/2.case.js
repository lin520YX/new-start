let fs = require('fs');
let ws =fs.createWriteStream('2.txt',{
    flags:'w',
    encoding:'utf8',
    autoClose:true,
    highWaterMark:1 //预计我用16k来写
})
let i =0;
let flag = true;
function write(){
    while(i<=9 &&flag){
        flag=ws.write(i++ +'');
    }
}
write();
ws.on('drain',()=>{
    flag = true;
    write()
})
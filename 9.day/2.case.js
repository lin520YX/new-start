let fs = require('fs');
let ws =fs.createWriteStream('3.txt',{
    flags:'w',
    encoding:'utf8',
    autoClose:true,
    highWaterMark:200 //预计我用16k来写
})
let i =0;
let flag = true;
function write(){
    while(i<=19 &&flag){
        flag=ws.write(i++ +'');
    }
}
write();
ws.on('drain',()=>{
    console.log(0)
    flag = true;
    write()
});
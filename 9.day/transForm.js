let { Transform } = require('stream');
class Mystream extends Transform{
    _transform(chunk,encoding,callback){
           this.push(chunk.toString().toUpperCase());
           callback();
    }
}
// 转化流
let myStream = new Mystream();
// 可独流 process.stdin
// 可写 process.stdout
process.stdin.pipe(myStream).pipe(process.stdout)
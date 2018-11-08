// 看一遍  可读流的原理
let fs = require('fs');
let ws =fs.createWriteStream('2.txt',{
    flags:'w',
    encoding:'utf8',
    autoClose:true,
    highWaterMark:1 //预计我用16k来写
})

// flag 代表写入的内容 是否等于或者超过预期
ws.write('1','utf8',()=>{
    console.log('cg')
})
// ws.write('2','utf8',()=>{
//     console.log('cg')
// })
// ws.write('3','utf8',()=>{
//     console.log('cg')
// })
// 内部会把 写的过程排队
// 第一次写  之后缓存 依次写入


// 只有写入的内容 大于预期 并被清空才会触发
ws.on('drain',()=>{
    console.log('ganle')
})


//  study way

let EventEmitter = require('events');
class WriteStream extends EventEmitter{
    constructor(path, options = {}) {
        super();
        this.path = path;
        this.autoClose = options.autoClose || true;
        this.flags = options.flags || 'r';
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.encoding = options.encoding || null;
        this.start =options.start||0;

        let cache =[];

        this.needDrain = false;
        // 写入的个数
        this.len = 0;

        // 写入的位置
        this.pos = this.start;

        // 打开文件
        this.open()
    }
    open(){
        fs.open(this.path,this.flags,(err,fd)=>{
            if(err){
                return this.emit('error',err)
            }
            this.fd = fd;
            this.emit('open',fd);
        })
    }
    write(chunk,encoding=this.encoding,callback){
        this.len +=Buffer.isBuffer(chunk)?chunk.length:Buffer.from(chunk).length;
        let flag =this.len >this.highWaterMark;
        if(flag){
            this.needDrain = true;
        }
        if(typeof this.fd !== 'number'){
            return this.once('open',()=>this.write())
        }
        // 第一次往里面写
        if(this.write){
            this.cache.push({
                chunk,
                encoding,
                callback
            })
        }else{
            this.write = true;
            // 内容写入
            this._write(
                chunk,
                encoding,
                ()=>this.clearBuffer()
            );// 实现
        }
        return !flag;
    }
}
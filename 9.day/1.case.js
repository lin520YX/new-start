let EventEmitter = require('events');
let fs = require('fs')
class ReadStream extends EventEmitter {
    constructor(path, options = {}) {
        super();
        this.path = path;
        this.autoClose = options.autoClose || true;
        this.flags = options.flags || 'r';
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.start = options.start || 0;
        this.end = option.end || null;
        this.encoding = options.encoding || null;
        // 默认情况 非流动模式 如果坚挺了 data 流动模式
        this.flowing = null;
        // 读取文件的位置
        this.pos = this.start;
        // 判读用户监听 什么事件
        this.on('newListener', (type) => {
            if (type === 'data') {
                this.flowing = true;
                this.open();
                this.read();
            }
        })
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                this.emit('error', err)
            }
            this.fd = fd;
            this.emit('open', fd);
        })
    }
    read() {
        if (typeof this.fd !== 'number') {
           return this.once('open',()=>this.read())
        }
        let buffer = Buffer.alloc(this.highWaterMark)
        let howMuchToRead = this.end?Math.min((this.end-this.pos+1),this.highWaterMark):this.highWaterMark;
        if(howMuchToRead==0){
            this.flowing = false;
            this.emit('end');
            return this.close()
        }
        fs.read(this.fd,buffer,0,howMuchToRead,this.pos,(err,bytesRead)=>{
            this.pos+= bytesRead;
            if(bytesRead>0){
                this.emit('data',buffer.slice(0,bytesRead));
                if(this.flowing){
                    this.read();
                }
            }
        })

    }
    close(){
        fs.close(this.fd,()=>{
            this.emit('close')
        })
    }
}
module.exports = ReadStream;
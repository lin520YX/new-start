let {Duplex}= require('stream');
class Mystream extends Duplex{
    _write(chunk,encoding,clearBuffer){
        clearBuffer();
    }
    _read(){
        this.push(1);
        this.push(null);
    }
}
// 双工流 http  
// 可读流 req
// 可写流 res

// 双工流当中的read 和write 方法可以没有关系
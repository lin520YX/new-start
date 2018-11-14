let {Readable} = require('stream');
let fs = require('fs');
fs.createReadStream('./1.txt');

class MyRead extends Readable{
    constructor(){
        super();
    }

    _read(){
        this.push('123')
        this.push(null)
    }
}
let myRead = new MyRead;
myRead.on('data',(data)=>{
    console.log(data)
})
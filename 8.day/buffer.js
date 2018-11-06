// 缓存 Buffer 他的展现方式是十六进制 短
// node 中的buffer 可以和字符串来转化

// 了解buffer 的基本操作
// 如何声明一个buffer
// 1.通过数字声明一个buffer
Buffer.alloc(3);// 3指代的是字节 声明之后不能修改

// buffer copy concat
// 把两个小buffer 拷贝到一个大的内存上
// 如何拷贝

let buf1 = Buffer.alloc(12);
let buf2 = Buffer.from('柴鸡');
let buf3 = Buffer.from('垃圾');
// target targets sources sourcee 
buf2.copy(buf1,0,0,6)                                                                                                                                   
buf3.copy(buf1,6,0,6)
console.log(buf1.toString())
Buffer.prototype.copy=function(target ,targets,sources,sourcee ){
    for(let i=0;i<sourcee-sources;i++){
        target[targets+i]=this[sources+i];
    }
}

Buffer.concat=function(lists,length=lists.reduce((prev,next)=>prev+next.length,0)){
    let buffer = Buffer.alloc(length);
    let offset =0;
    for(let i =0 ;i<lists.length;i++){
        lists[i].copy(buffer,offset,0,lists[i].length)
        offset += lists[i].length;
    }
    return buffer.slice(0,offset);
}

// indexOf
console.log(Buffer.from('林云富').indexOf('云'))
// buffer 中没有切割的方法

Buffer.prototype.split=function(sep){
    let arr=[];
    let position=0;
    let length = Buffer.from(sep).length;
    let offset=0;
    while(-1!=(offset=this.indexOf(sep,position))){
        arr.push(this.slice(position,offset));
        position =offset+length;
    }
    arr.push(this.slice(position));
    return arr;
}
console.log(Buffer.from('林云富').split('云').toString())
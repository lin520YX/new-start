let util = require('util');
let fs = require('fs');
let read = util.promisify(fs.readFile);
read('1.txt','utf8').then((data)=>{
    console.log(data);
    // console.log(data)
})

// 继承的方法 node 中有大量的集成 构造函数集成
// object.create();
// object.setPrototypeOf()
util.inherits(); //集成圆形上的属性公有属性
// Node主要是靠 事件驱动 发布订阅
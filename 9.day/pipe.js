let fs = require('fs');
let rs=fs.createReadStream('1.txt');
let ws =fs.createWriteStream('2.txt')
rs.pipe(ws)
// 调用ws 中的write 方法
// 读取过程  fs.createReadStream('1.txt')  read
// 方法父类实现readable接口 我们子类会继承这个接口 默认我们写子类时 会实现一个_read 方法


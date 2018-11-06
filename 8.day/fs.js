// file system 文件操作
let fs = require('fs');
// 一般都用 同步异步 两种方式
// 异步捕获错误 只能通过err First

// 不可能读取比内存大的文件
fs.readFileSync('age.txt');
// 使用异步 不会阻碍主线程

// 写入的时候 没有文件会创建文件，如果有内容会清空内容


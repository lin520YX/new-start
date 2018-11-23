console.log(1111)

// node 中提供了一个模块 可以进行摘要算法

// md5 摘要算法 加密 -》解密
// 相同内容 摘要出的结果相同
// 不相同的内容摘要的结果永远长度相同，内容不同的 永远不同

let crypto = require('crypto');
let md5 =crypto.createHash('md5');
let newMd5 =md5.update('123456').digest('base64');
console.log(newMd5)
let fs = require('fs');
let rs=fs.createReadStream('1.txt');
let ws =fs.createWriteStream('2.txt')
rs.pipe(ws)
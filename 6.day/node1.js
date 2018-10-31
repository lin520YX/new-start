let fs = require('fs');
fs.readFile('aa.js',()=>{
    setTimeout(()=>{
        console.log(2)
    })
    setImmediate(()=>{
        console.log(1)
    })
})

1
2
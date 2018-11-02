process.stdout.write('呵呵呵')//标准输出
process.stderr.write('呵呵呵')// 错误输出
process.stdin.on('data',(data)=>{
    console.log(data.toString())
})
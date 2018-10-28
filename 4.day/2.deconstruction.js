// 解构赋值 结构 相等的内容可以直接拿出来
Promise.all([1,2,3,4]).then(([,,a,,b])=>{
    console.log(a,b)
})
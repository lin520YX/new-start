## 问题1.
```
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})
promise.then(() => {
  console.log(3)
});
```
```
问题1
1
3
```
## 问题2.
```
Promise.resolve(1)
.then((res) => {
  console.log(res)
  return 2
}).catch((err) =>3)
.then(res => console.log(res))
```
```
问题2
1
2
```
## 问题3.

实现 Promise.finally 并说下finally的含义
```
问题3：
不论是失败还是成功都会执行
```

## 问题4.
async、await 优缺点
```
问题4:
简化代码：
优点：多个函数组成功能的情况，使用async/await可以从视觉上降低复杂度
语法之后不用链式，在异步代码中可以trycatch 捕获异常；
缺点：难以区分函数事件，编译成es5后有一些大
```

## 问题5.
```
Promise.resolve(1)
  .then((x) => x + 1)
  .then((x) => { throw new Error('My Error') })
  .catch(() => 1)
  .then((x) => x + 1)
  .then((x) => console.log(x))
  .catch(console.error)
```
问题5:
   2
   第二个then 抛出错误 代码停止执行 catch return 1
```
问题5；

```
## 问题6.
Promise 在事件循环中的执行过程是怎样的？
```
promise是微任务 在浏览器事件环里面优先执行主程序后->清空微任务队列->宏任务执行-> 微任务执行->宏任务
```

## 问题7.
谈一谈 你对promise的理解
```
为了解决异步回调地狱
异步操作序列化，按照期望的顺序执行，帮助处理队列
```
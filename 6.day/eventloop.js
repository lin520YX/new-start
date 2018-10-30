// ⌚️环
// 进程 计算机任务 调度的最小单位
// 线程 进程里面包含线程
// js单线程

// js 也可以任务是多线程的

// 队列和栈

// 队列 先进先出 管子
// 栈 后进先出   桶

// 执行 执行顺序无关 
// [1,2,3].pop()
// [1,2,3].shift()


// then 方法 比 setTimeout 的等级更高

// then 微任务
// 浏览器时间环 微任务会优先 执行


// 栈 主栈执行完毕 清空微任务 在红任务队列中的第一个执行 并且执行完清空 在第二个

// 微任务 promise then MutationObserver
// 宏任务 setImmediate setTimeOut setInterval MessageChannel

// 异步/非阻塞/io 文件读写